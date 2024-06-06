# Centos系统安装Docker

## 1. 准备工作

- 确认系统版本为Centos7.x
- 确认系统已经安装了yum包管理器

## 2. 安装Docker

```bash
# 1. 更新yum源
sudo yum update -y

# 2. 安装Docker
sudo yum install -y docker

# 3. 启动Docker
sudo systemctl start docker

# 4. 验证Docker是否安装成功
sudo docker version
```

## 3. 配置Docker镜像加速器

```bash
# 1. 登录Docker官方网站，找到Docker镜像加速器地址
https://www.docker.com/

# 2. 编辑/etc/docker/daemon.json文件，添加以下内容：
{
  "registry-mirrors": ["https://registry.docker-cn.com"]
}

# 3. 重启Docker服务
sudo systemctl restart docker
```

## 4. 验证Docker镜像加速器是否生效

```bash
# 1. 拉取镜像
sudo docker pull nginx


# 2. 验证是否加速成功
sudo docker images
```

## 5. 卸载Docker

1. 停止Docker服务

```bash
sudo systemctl stop docker
```

2. 卸载Docker

```bash
sudo yum remove docker-ce
```

3. 确认Docker服务已停止并卸载成功

```bash
sudo systemctl status docker
```