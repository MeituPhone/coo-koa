function errorHandle(){
    return async function onerror(ctx, next) {
        try {
            await next();
        } catch (err) {
            let error = err.error || err;

            ctx.status = err.status || err.status || 500;
            ctx.body = { error } || 'server error';
            // ctx.app.emit('error', err);
        }
    }
}

module.exports = errorHandle;