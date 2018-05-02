# 开发工具
IDE: Visual Studio Code ,方便断点调试

自动重启：nodemon，修改node代码后，自动重启node 服务

## mac 下 mongodb 安装
1、mac下载路径：[mongodb下载](https://www.mongodb.com/dr/fastdl.mongodb.org/osx/mongodb-osx-ssl-x86_64-3.6.3.tgz/download)

2、解压目录下载文件

3、安装
```bash
# 创建目录
mkdir mongodb-simple
cd mongodb-simple

# 创建数据、日志、配置文件夹
mkdir data
mkdir log
mkdir bin
mkdir conf

# 复制文件夹、创建配置文件
cp xxx/bin/mongod bin/
cd config
vim mongod.conf
./bin/mongod -f conf/mongod.conf
cp xxx/bin/mongo bin/

# 启动 mongodb
./bind/mongo 127.0.0.1:12345/test
```


# mongod.conf 内容
```bash
port = 12345
dbpath = data
logpath = log/mongod.log
fork = true
```

## mongodb 配置文档
https://docs.mongodb.com/manual/reference/configuration-options/


## 安装配置
`npm install`

## 启动代码
`npm start`

## 目录说明

```bash
    ├──routes/                     * 路由目录文件
    ├──controllers/                * 控制器目录
    ├──dao/                        * 数据库操作
    │   │──handle                  * 数据库操作方法目录
    │   │──models                  * 数据库模型定义目录
    │   │──schemas                 * 数据模式定义目录
```


