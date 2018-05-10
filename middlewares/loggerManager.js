/**
 * 日志中间件
 * Created by 王佳欣 on 2018/5/9.
 */
import logger from 'koa-logger';

export default () => {
    return async (ctx, next) => {
        await next();
    };
};
