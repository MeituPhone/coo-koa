function errorHandle() {
    return async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            console.log(err);
            let error = err.error;

            ctx.status = err.status || err.status || 500;
            ctx.body = error ? { error } : 'server error';
            // ctx.app.emit('error', err);
        }
    }
}

module.exports = errorHandle;