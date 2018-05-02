/**
 * token 管理类
 * Created by 王佳欣 on 2018/5/2.
 */
let redisClient = require('./redis_database').redisClient;
const TOKEN_EXPIRATION = 60;
const TOKEN_EXPIRATION_SEC = TOKEN_EXPIRATION * 60;

const getToken = (headers) => {
    if (headers && headers.authorization) {
        let authorization = headers.authorization;
        let part = authorization.split(' ');

        return part.length === 2 ? part[1] : null;
    }
    else {
        return null;
    }
};

// Middleware for token verification
export const verifyToken = (ctx, next) => {
    let token = getToken(ctx.request.headers);

    redisClient.get(token, (err, reply) => {
        if (err) {
            return ctx.response.send(500);
        }

        if (reply) {
            ctx.response.send(401);
        }
        else {
            next();
        }
    });
};

exports.expireToken = function(headers) {
    let token = getToken(headers);

    if (token !== null) {
        redisClient.set(token, { is_expired: true });
        redisClient.expire(token, TOKEN_EXPIRATION_SEC);
    }
};
