# SpringBoot3+Vue3实现大文件分片上传和断点续传

## 前言

在实际的业务场景中，我们可能会遇到大文件上传的场景，比如上传视频、音频、图片等。传统的上传方式一般都是采用表单提交的方式，但是对于大文件来说，表单提交的方式会导致请求体过大，导致服务器压力过大，甚至会导致服务器崩溃。因此，我们需要采用分片上传的方式来解决这个问题。

分片上传的原理是将大文件切分成多个小文件，然后逐个上传，最后再将这些小文件拼接起来。这样，就可以避免表单提交导致的请求体过大的问题。

## 实现方案

下面我们来实现一个 SpringBoot3+Vue3 的大文件分片上传和断点续传的功能。

### 前端实现

首先，我们需要在前端实现一个上传组件，可以支持分片上传和断点续传。

```html
<template>
  <div>
    <el-upload
      class="upload-demo"
      action="http://localhost:8080/upload"
      :file-list="fileList"
      :multiple="false"
      :auto-upload="false"
      :on-success="handleSuccess"
      :on-progress="handleProgress"
      :on-error="handleError"
      :on-remove="handleRemove"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div class="el-upload__tip" slot="tip" v-if="fileList.length">
        {{ fileList[0].name }}
      </div>
    </el-upload>
    <el-button type="primary" @click="upload">开始上传</el-button>
  </div>
</template>


<script>
export default {
  name: "Upload",
  data() {
    return {
      fileList: [],
      chunkSize: 1024 * 1024 * 2, // 每个分片大小为2M
      chunkIndex: 0, // 当前分片索引
      chunks: [], // 所有分片
      uploadUrl: "http://localhost:8080/upload", // 上传地址
      uploadHeaders: {}, // 上传请求头
      uploadParams: {}, // 上传参数
      uploadTimeout: 0, // 上传超时时间
      uploadTask: null, // 上传任务
      isUploading: false, // 是否正在上传
      isFinished: false, // 是否上传完成
    };
  },
  methods: {
    // 上传文件
    upload() {
      if (this.fileList.length === 0) {
        return;
      }
      this.isUploading = true;
      this.isFinished = false;
      this.uploadTask = this.createUploadTask();
      this.uploadTask.on("success", (res) => {
        this.isUploading = false;
        this.isFinished = true;
        this.fileList = [];
        this.chunks = [];
        this.chunkIndex = 0;
        this.$message.success("上传成功");
      });
      this.uploadTask.on("progress", (res) => {
        this.handleProgress(res);
      });
      this.uploadTask.on("error", (res) => {
        this.handleError(res);
      });
    },
    // 创建上传任务
    createUploadTask() {
      const chunk = this.chunks[this.chunkIndex];
      const chunkBlob = new Blob([chunk]);
      const chunkFile = new File([chunkBlob], this.fileList[0].name, {
        type: this.fileList[0].type,
      });
      const formData = new FormData();
      for (const key in this.uploadParams) {
        formData.append(key, this.uploadParams[key]);
      }
      formData.append("file", chunkFile, this.fileList[0].name);
      return uni.uploadFile({
        url: this.uploadUrl,
        headers: this.uploadHeaders,
        timeout: this.uploadTimeout,
        formData: formData,
        onProgressUpdate: (res) => {
          this.handleProgress(res);
        },
      });
    },
    // 上传进度
    handleProgress(res) {
      const progress = (res.total / res.totalSize) * 100;
      this.fileList[0].percentage = progress;
    },
    // 上传错误
    handleError(res) {
      this.isUploading = false;
      this.isFinished = false;
      this.fileList = [];
      this.chunks = [];
      this.chunkIndex = 0;
      this.$message.error("上传失败");
    },
    // 上传成功
    handleSuccess(res) {
      this.chunkIndex++;
      if (this.chunkIndex < this.chunks.length) {
        this.uploadTask = this.createUploadTask();
      } else {
        this.isUploading = false;
        this.isFinished = true;
        this.fileList = [];
        this.chunks = [];
        this.chunkIndex = 0;
        this.$message.success("上传成功");
      }
    },
    // 移除文件
    handleRemove() {
      this.isUploading = false;
      this.isFinished = false;
      this.fileList = [];
      this.chunks = [];
      this.chunkIndex = 0;
    },
    // 切分文件
    splitFile() {
      const file = this.fileList[0];
      const chunkSize = this.chunkSize;
      const chunks = [];
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const buffer = e.target.result;
        const totalSize = buffer.byteLength;
        for (let i = 0; i < totalSize; i += chunkSize) {
          const chunk = buffer.slice(i, i + chunkSize);
          chunks.push(chunk);
        }
        this.chunks = chunks;
        this.chunkIndex = 0;
        this.uploadTask = this.createUploadTask();
      };
    },
  },
  watch: {
    fileList: {
      handler(val) {
        if (val.length > 0) {
          this.splitFile();
        }
      },
      deep: true,
    },
  },
};
</script>


<style scoped>
.upload-demo {
  width: 100%;
}
</style>
```

1. 我们使用 `el-upload` 组件来实现上传功能。
2. 我们设置 `action` 属性为上传地址，`multiple` 属性为 `false` 表示只能上传单个文件。
3. 我们设置 `auto-upload` 属性为 `false` 表示不自动上传，需要手动点击上传按钮。
4. 我们设置 `on-success`、`on-progress`、`on-error`、`on-remove` 等事件回调函数，来处理上传成功、上传进度、上传错误、移除文件等情况。
5. 我们设置 `uploadUrl`、`uploadHeaders`、`uploadParams`、`uploadTimeout` 属性，来配置上传相关参数。
6. 我们实现 `splitFile` 方法，用来切分文件。
7. 我们实现 `createUploadTask` 方法，用来创建上传任务。
8. 我们实现 `handleProgress` 方法，用来处理上传进度。
9. 我们实现 `handleError` 方法，用来处理上传错误。
10. 我们实现 `handleSuccess` 方法，用来处理上传成功。
11. 我们实现 `handleRemove` 方法，用来处理移除文件。


### 后端实现

然后，我们需要在后端实现一个接口，用来接收分片上传的文件。

```java
@RestController
@RequestMapping("/upload")
public class UploadController {

    @PostMapping
    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file,
                                          @RequestParam(value = "chunk", required = false) Integer chunk,
                                          @RequestParam(value = "chunks", required = false) Integer chunks,
                                          @RequestParam(value = "filename", required = false) String filename,
                                          @RequestParam(value = "identifier", required = false) String identifier) throws IOException {
        if (chunk == null || chunks == null || filename == null || identifier == null) {
            // 非分片上传
            return ResponseEntity.ok("非分片上传");
        }
        // 分片上传
        String rootPath = "D:/upload/";
        String savePath = rootPath + identifier + "/";
        File saveDir = new File(savePath);
        if (!saveDir.exists()) {
            saveDir.mkdirs();
        }
        String saveFileName = savePath + filename + "_" + chunk;
        File saveFile = new File(saveFileName);
        if (!saveFile.exists()) {
            saveFile.createNewFile();
        }
        file.transferTo(saveFile);
        // 检查是否上传完成
        boolean isFinished = true;
        for (int i = 1; i <= chunks; i++) {
            String tempFileName = savePath + filename + "_" + i;
            File tempFile = new File(tempFileName);
            if (!tempFile.exists()) {
                isFinished = false;
                break;
            }
        if (isFinished) {
            // 合并分片
            String finalFileName = savePath + filename;
            File finalFile = new File(finalFileName);
            if (!finalFile.exists()) {
                finalFile.createNewFile();
            }
            FileOutputStream outputStream = new FileOutputStream(finalFile, true);
            for (int i = 1; i <= chunks; i++) {
                String tempFileName = savePath + filename + "_" + i;
                File tempFile = new File(tempFileName);
                FileInputStream inputStream = new FileInputStream(tempFile);
                byte[] buffer = new byte[1024];
                int len = 0;
                while ((len = inputStream.read(buffer)) != -1) {
                    outputStream.write(buffer, 0, len);
                }
                inputStream.close();
            }
            outputStream.close();
            // 删除分片
            for (int i = 1; i <= chunks; i++) {
                String tempFileName = savePath + filename + "_" + i;
                File tempFile = new File(tempFileName);
                tempFile.delete();
            }
            return ResponseEntity.ok("上传成功");
        }
        return ResponseEntity.ok("上传中");
    }
}
```

1. 我们使用 `@PostMapping` 注解来接收上传的文件。
2. 我们获取 `chunk`、`chunks`、`filename`、`identifier` 参数，用来判断是否为分片上传。
3. 我们获取 `file` 参数，用来获取上传的文件。
4. 我们根据 `identifier` 参数，创建保存路径。
5. 我们根据 `filename`、`chunk` 参数，创建保存文件名。
6. 我们将上传的文件保存到保存文件。
7. 我们检查是否上传完成，如果上传完成，我们合并分片，并删除分片。
8. 我们返回上传结果。


### 总结

通过上面的实现，我们可以实现 SpringBoot3+Vue3 的大文件分片上传和断点续传功能。

当然，还有很多细节需要处理，比如上传失败的处理、断点续传的恢复等，这些都需要根据实际情况进行优化。