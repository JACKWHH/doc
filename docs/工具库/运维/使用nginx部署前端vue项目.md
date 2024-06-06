# 使用nginx部署前端Vue项目

## 前言

Vue项目部署到服务器上，一般有两种方式：

1. 使用静态资源服务器：将Vue编译后的静态资源部署到静态资源服务器，如nginx、Apache等。
2. 使用Node.js服务器：将Vue项目部署到Node.js服务器，如Express、Koa等。

本文将介绍使用nginx部署Vue项目的步骤。

## 安装nginx

```
sudo apt-get install nginx
```

## 配置nginx

```
sudo vi /etc/nginx/sites-available/default
```

```
server {
    listen 80;
    server_name example.com;

    location / {
        root /var/www/html/example;
        index index.html;
    }
}
```

其中，`example.com`为域名，`root /var/www/html/example`为Vue项目的静态资源目录，`index index.html`为Vue项目的入口文件。

## 启动nginx

```
sudo systemctl start nginx
```

## 访问Vue项目

在浏览器中输入`http://example.com`即可访问Vue项目。

