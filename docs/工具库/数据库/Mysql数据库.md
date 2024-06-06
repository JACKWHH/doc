# Mysql数据库

## 安装

```bash
sudo apt-get install mysql-server
```

## 启动

```bash
sudo service mysql start
```



## 登录

```bash
mysql -u root -p
```



## 退出

```bash
exit
```



## 常用命令

```bash
# 显示所有数据库
SHOW DATABASES;

# 选择数据库
USE database_name;

# 创建数据库
CREATE DATABASE database_name;

# 删除数据库
DROP DATABASE database_name;

# 显示所有表
SHOW TABLES;

# 创建表
CREATE TABLE table_name (
    column1 datatype,
    column2 datatype,
    column3 datatype,
    column4 datatype
);

# 删除表
DROP TABLE table_name;

# 插入数据
INSERT INTO table_name (column1, column2, column3, column4)
VALUES (value1, value2, value3, value4);

# 查询数据
SELECT column1, column2, column3, column4
FROM table_name;

# 更新数据
UPDATE table_name
SET column1 = value1, column2 = value2, column3 = value3, column4 = value4  
WHERE condition;

# 删除数据
DELETE FROM table_name
WHERE condition;
```