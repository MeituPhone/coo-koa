/**
 * 管理员控制器
 * Created by 王佳欣 on 2018/4/28.
 */
import MSG from '../consts/msg';
import administratorHandle from'../dao/handle/administrator';
import {expireToken, getToken} from '../utils/tokenManager';
import JWT from  'jsonwebtoken';
import {TOKE_SECRET_KEY} from '../consts';

// 创建管理员
let create = async (ctx, next) => {
    let { administrator, password, nickname, avatar } = ctx.request.body;
    await administratorHandle.create({administrator, password, nickname, avatar}).then((result) => {
        ctx.body = JSON.stringify(result);
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
    let {include, value} = ctx.request.body;
    let token = getToken(ctx.request.headers);
    let name = await JWT.verify(token, TOKE_SECRET_KEY).name;

    await administratorHandle.update({include, value, name}).then((result) => {
        ctx.body = JSON.stringify(result);
    }).catch((error) => {
        ctx.body = JSON.stringify({
            error: {
                ...MSG.UPDATE_ERROR
            }
        });
    });
};

// 根据id获取用户
let get = async (ctx, next) => {
    let {id} = ctx.params;
    if (!id) {
        return ctx.body = JSON.stringify({error});
    }

    await administratorHandle.findById(id).then((result) => {
        if (!result) {
            return ctx.body = JSON.stringify({});
        }

        ctx.body = JSON.stringify(result);
    }).catch((error) => {
        console.log(error);
        ctx.body = JSON.stringify({error});
    });
};

// 当前用户
let me = async (ctx, next) => {
    let token = getToken(ctx.request.headers);
    await JWT.verify(token, TOKE_SECRET_KEY, (error, decoded) => {
        if (error) {
            return ctx.body = JSON.stringify({});
        }
        return administratorHandle.findByName(decoded.name).then((result) => {
            if (!result) {
                ctx.body = JSON.stringify({});
            }
            ctx.body = JSON.stringify(result);
        }).catch((error) => {
            ctx.body = JSON.stringify({});
        });
    });
};

// 列表
let list = async (ctx, next) => {
    let {page = 1, per_page = 10} = ctx.request.query;

    let skip = (page - 1) * per_page;
    await administratorHandle.fetch({}, skip, per_page).then((result) => {
        ctx.body = JSON.stringify(result || []);
    }).catch(error => {
        ctx.body = JSON.stringify({error});
    });
};

// 登录
let login = async (ctx, next) => {
    let {name, password} = ctx.request.body;
    await administratorHandle.login(name, password).then((result) => {
        ctx.body = JSON.stringify(result);
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
    update,
    me,
    list,
    login,
    logout
};