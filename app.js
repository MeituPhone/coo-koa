const Koa = require('koa');
const app = new  Koa();
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:12345/MeituPhone_Koa');

// 引用bodyparser 中间件
app.use(bodyParser({
  enableTypes:['json']
}));

// 引入路由
var routers = require('./routes/routers.js')

app.use(routers.routes());

app.listen(3000);
console.log('app started at port 3000 ....');