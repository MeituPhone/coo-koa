# 开发工具
IDE: Visual Studio Code ,方便断点调试

自动重启：supervisor，修改node代码后，自动重启node 服务

## 安装配置
`npm install`

## 启动代码
`supervisor node app.js`

## 目录说明

```bash
    ├──routes/                     * 路由目录文件
    ├──controllers/                * 控制器目录
    ├──dao/                        * 数据库操作
    │   │──handle                  * 数据库操作方法目录
    │   │──models                  * 数据库模型定义目录
    │   │──schemas                 * 数据模式定义目录
```