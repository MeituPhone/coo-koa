/**
 * 异常中间件
 * Created by 王佳欣 on 2018/5/9.
 */

export default () => {
    return async (ctx, next) => {
        try {
            await next();
        } catch (error) {
            ctx.response.status = error.statusCode || error.status || 500;
            ctx.response.body = {
                message: error.message
            };
        }
    };
}