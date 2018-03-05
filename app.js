const Koa = require('koa');
const app = new  Koa();
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
var routers = require('./routes/routers.js')

mongoose.connect('mongodb://127.0.0.1:12345/imooc');

// 引用bodyparser 中间件
app.use(bodyParser({
  enableTypes:['json']
}));

app.use(routers.routes()).use(routers.allowedMethods());

app.listen(3000);
console.log('app started at port 3000 ....');