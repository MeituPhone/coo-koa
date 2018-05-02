/**
 * 管理员控制器
 * Created by 王佳欣 on 2018/4/28.
 */
import MSG from '../consts/msg';
import administratorHandle from'../dao/handle/administrator';
import {expireToken, getToken} from '../utils/tokenManager';
import JWT from  'jsonwebtoken';
import {TOKE_SECRET_KEY} from '../consts';

// 注册
let create = async (ctx, next) => {
    let { administrator, password, nickname, avatar } = ctx.request.body;
    administratorHandle.create({administrator, password, nickname, avatar}).then((result) => {
        result = JSON.parse(JSON.stringify(result));
        delete result.password;
        result.id = result._id;
        delete result._id;
        ctx.body = JSON.stringify({result});
    }).catch((error) => {
        ctx.body = JSON.stringify({
            error: {
                ...MSG.CREATE_ERROR
            }
        });
    });
};

// 更新信息
let update = async (ctx, next) => {
    let {username, password} = ctx.request.body;
    let result = userHandle.update({username, password});
    cxt.body = JSON.stringify({
        result
    });
};

// 根据用户名获取用户
let get = async (ctx, next) => {
    let name = ctx.params.name;
    await administratorHandle.findByName(name).then((result) => {
        result = JSON.parse(JSON.stringify(result));
        delete result.password;
        result.id = result._id;
        delete result._id;
        ctx.body = JSON.stringify({result});
    }).catch((error) => {
        ctx.body = JSON.stringify({error});
    });
};

// 当前用户
let current = async (ctx, next) => {
    let token = getToken(ctx.request.headers);
    await JWT.verify(token, TOKE_SECRET_KEY, (error, decoded) => {
        if (error) {
            ctx.body = JSON.stringify({});
        }
        return administratorHandle.findByName(decoded.name).then((result) => {
            if (!result) {
                ctx.body = JSON.stringify({});
            }
            result = JSON.parse(JSON.stringify(result));
            delete result.password;
            result.id = result._id;
            delete result._id;
            ctx.body = JSON.stringify(result);
        }).catch((error) => {
            ctx.body = JSON.stringify({});
        });
    });
};

// 登录
let login = async (ctx, next) => {
    let {name, password} = ctx.request.body;
    await administratorHandle.login(name, password).then((result) => {
        ctx.body = JSON.stringify({result});
    }).catch((error) => {
        ctx.body = JSON.stringify({error});
    });
};

// 退出
let logout = async (ctx, next) => {
    expireToken(ctx);
    ctx.body = JSON.stringify({});
};

module.exports = {
    create,
    get,
    current,
    login,
    logout
};