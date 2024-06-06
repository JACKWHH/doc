# 一键启停Springboot服务

## 前言

在日常的开发中，我们经常需要启动或者停止 Springboot 服务，但是每次都需要手动输入命令，这无疑是一件麻烦的事情。因此，我们可以利用脚本来实现一键启动或者停止 Springboot 服务。

## 脚本编写

下面是一键启动或者停止 Springboot 服务的脚本，可以将其保存为 `start-springboot.sh` 或 `stop-springboot.sh` 并赋予可执行权限：


```bash
#!/bin/bash


# 启动 Springboot 服务
function start() {
    echo "Starting Springboot service..."  
    cd /path/to/your/springboot/project
    nohup java -jar your-springboot-project.jar > /dev/null 2>&1 &
    echo "Springboot service started successfully!"
}

# 停止 Springboot 服务
function stop() {
    echo "Stopping Springboot service..."
    pid=$(ps -ef | grep "your-springboot-project.jar" | grep -v grep | awk '{print $2}')
    if [ -z "$pid" ]; then
        echo "Springboot service is not running!"
    else
        kill -9 $pid
        echo "Springboot service stopped successfully!"
    fi
}

# 根据输入参数进行相应的操作
case $1 in
    start)
        start
        ;;
    stop)
        stop
        ;;
    *)
        echo "Usage: $0 {start|stop}"
        exit 1
        ;;
esac
```

## 使用方法

在终端中，切换到脚本所在目录，输入以下命令即可启动或者停止 Springboot 服务：

```bash
./start-springboot.sh start
```

```bash
./stop-springboot.sh stop
```

## 注意事项

1. 脚本中需要替换 `/path/to/your/springboot/project` 为实际的 Springboot 项目路径。
2. 脚本中需要替换 `your-springboot-project.jar` 为实际的 Springboot 项目 jar 包名称。
3. 脚本中需要替换 `your-springboot-project` 为实际的 Springboot 项目名称。
4. 脚本中 `nohup` 命令的使用可以将 Springboot 服务输出重定向到 `/dev/null` 避免在终端中显示输出信息。
5. 脚本中 `ps` 命令的使用可以获取 Springboot 服务的进程 ID，并使用 `kill` 命令杀死进程。
6. 脚本中 `case` 命令的使用可以根据输入参数进行相应的操作。