import Koa from 'koa';
import Cors from'koa-cors';
import BodyParser from 'koa-bodyparser';
import Convert from 'koa-convert';
import passport from 'koa-passport';
import routes from'./routes';
import './config/mongo_database.js';
import './config/redis_database.js';

const app = new  Koa();

// 初始化 passport 验证模块
app.use(passport.initialize());

// 跨域处理
app.use(Convert(Cors()));

// 引用bodyparser 中间件
app.use(BodyParser());

app.use(routes.routes(), routes.allowedMethods());

app.listen(3000);
console.log('app sctarted at port 3000 ....');