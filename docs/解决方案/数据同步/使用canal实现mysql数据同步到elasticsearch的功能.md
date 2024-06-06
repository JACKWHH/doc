# 使用canal实现mysql数据同步到elasticsearch的功能

## 前言

canal是一个阿里开源的mysql数据库binlog的增量订阅&消费组件，它可以实时将mysql的binlog中的数据变化实时同步到kafka、rabbitmq等消息队列中，然后通过canal-adapter组件解析kafka/rabbitmq中的消息，并将解析后的数据同步到elasticsearch中。

## 准备工作

### 安装canal

canal的安装包可以从github上下载，下载地址：https://github.com/alibaba/canal/releases

下载完成后，解压到指定目录，并配置环境变量。

```
# 解压到指定目录
tar -zxvf canal.deployer-1.1.4.tar.gz -C /usr/local

# 配置环境变量
vim /etc/profile
export CANAL_HOME=/usr/local/canal
export PATH=$PATH:$CANAL_HOME/bin
source /etc/profile
```

### 安装canal-adapter

canal-adapter是canal的消费端，它可以消费canal推送的binlog消息，并将解析后的数据同步到elasticsearch中。

```
# 下载canal-adapter
wget https://github.com/alibaba/canal/releases/download/canal-1.1.4/canal.adapter-1.1.4.tar.gz


# 解压到指定目录
tar -zxvf canal.adapter-1.1.4.tar.gz -C /usr/local


# 配置环境变量
vim /etc/profile
export CANAL_HOME=/usr/local/canal
export PATH=$PATH:$CANAL_HOME/bin
export CANAL_ADAPTER_HOME=/usr/local/canal/canal.adapter-1.1.4
export PATH=$PATH:$CANAL_ADAPTER_HOME/bin
source /etc/profile
```


### 安装elasticsearch

elasticsearch是开源的搜索引擎，这里我们使用elasticsearch作为canal-adapter的同步目标。

```
# 安装elasticsearch
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.10.2-linux-x86_64.tar.gz
tar -zxvf elasticsearch-7.10.2-linux-x86_64.tar.gz -C /usr/local

# 配置环境变量
vim /etc/profile
export ES_HOME=/usr/local/elasticsearch
export PATH=$PATH:$ES_HOME/bin
source /etc/profile
```

### 配置canal

canal的配置文件位于$CANAL_HOME/conf/canal.properties，这里我们需要修改以下几个配置项：

```
# 数据库连接信息
canal.destinations=example
canal.instance.master.address=127.0.0.1:3306
canal.instance.dbUsername=root
canal.instance.dbPassword=123456
canal.instance.connectionCharset=UTF-8


# canal向kafka推送binlog的配置
canal.mq.topic=example
canal.mq.servers=127.0.0.1:9092


# canal-adapter向elasticsearch同步数据的配置
canal.mq.es.index=example
canal.mq.es.type=example
canal.mq.es.batch.size=1000
canal.mq.es.hosts=127.0.0.1:9200
```


## 启动canal

```
# 启动canal
$CANAL_HOME/bin/startup.sh


# 启动canal-adapter
$CANAL_ADAPTER_HOME/bin/startup.sh
```

## 测试同步

在mysql中插入一条数据，然后在elasticsearch中查看是否同步成功。

```
# 插入数据
mysql> insert into example values(1, 'test');


# 查看elasticsearch中是否同步成功
GET example/_search
```

## 停止canal

```
# 停止canal
$CANAL_HOME/bin/stop.sh


# 停止canal-adapter
$CANAL_ADAPTER_HOME/bin/stop.sh
```

