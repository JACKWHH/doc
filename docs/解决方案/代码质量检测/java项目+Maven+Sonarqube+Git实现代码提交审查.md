# java项目+maven+sonarqube+githook 实现代码提交审查

## 前言

在日常的开发中，我们经常会遇到代码提交审查的问题，比如说代码风格检查、代码质量检查、代码安全检查等。在这里，我们将介绍如何使用java项目+maven+sonarqube+githook实现代码提交审查。

## 环境准备

- JDK 1.8+
- Maven 3.6+
- SonarQube 8.3+
- Git 2.24+
- Git Hooks
- IDE（推荐 IntelliJ IDEA）

## 项目搭建

### 创建项目

创建一个maven项目，并在pom.xml文件中添加以下依赖：

```xml
<dependency>
    <groupId>org.sonarsource.scanner.maven</groupId>
    <artifactId>sonar-maven-plugin</artifactId>
    <version>3.6.0.1398</version>
</dependency>
```

### 配置SonarQube

下载SonarQube，并启动服务。

创建SonarQube项目，并配置SonarQube地址。

### 配置Git Hooks

在项目的.git/hooks目录下创建pre-commit文件，并添加以下内容：

```bash
#!/bin/bash
mvn clean org.sonarsource.scanner.maven:sonar-maven-plugin:3.6.0.1398:sonar -Dsonar.host.url=http://localhost:9000 -Dsonar.login=admin -Dsonar.projectKey=your_project_key
```

其中，your_project_key是SonarQube项目的key。

## 运行SonarQube

在项目根目录下运行以下命令：

```bash
mvn clean org.sonarsource.scanner.maven:sonar-maven-plugin:3.6.0.1398:sonar -Dsonar.host.url=http://localhost:9000 -Dsonar.login=admin -Dsonar.projectKey=your_project_key
```

## 代码提交

在IDE中编写代码，并提交到Git仓库。

## 代码审查

等待SonarQube扫描完成，并查看代码质量。

## 总结

通过上述步骤，我们可以实现java项目+maven+sonarqube+githook实现代码提交审查。