import Koa from 'koa';
import Cors from'koa-cors';
import BodyParser from 'koa-bodyparser';
import Mongoose from 'mongoose';
import Convert from 'koa-convert';
import routes from'./routes';

Mongoose.connect('mongodb://127.0.0.1:12345/imooc');

const app = new  Koa();

// 跨域处理
app.use(Convert(Cors()))

// 引用bodyparser 中间件
app.use(BodyParser({
  enableTypes:['json']
}));

app.use(routes.routes(), routes.allowedMethods());

app.listen(3000);
console.log('app started at port 3000 ....');