/**
 * 管理员控制器
 * Created by 王佳欣 on 2018/4/28.
 */
import MSG from '../consts/msg';
import administratorHandle from'../dao/handle/administrator';
import {expireToken, getToken} from '../utils/tokenManager';
import JWT from  'jsonwebtoken';
import {TOKEN_SECRET_KEY} from '../consts';

// 创建管理员
let create = async (ctx, next) => {
    let { administrator, password, nickname, avatar, status } = ctx.request.body;
    status = parseInt(status || '0');
    await administratorHandle.create({administrator, password, nickname, avatar, status}).then((result) => {
        ctx.body = JSON.stringify(result);
    }).catch((error) => {
        ctx.body = JSON.stringify({
            error
        });
    });
};

// 删除管理员
let remove = async (ctx, next) => {
    let {id} = ctx.params;
    await administratorHandle.remove(id).then((result) => {
        ctx.body = JSON.stringify(result);
    }).catch((error) => {
        ctx.body = JSON.stringify({
            error: {
                ...MSG.REMOVE_ERROR
            }
        });
    });
};

// 更新信息
let update = async (ctx, next) => {
    let {include, value, id} = ctx.request.body;
    let {type} = ctx.request.query;

    let data = {};
    let condition = {};

    if (type === 'edit') {
        let token = getToken(ctx.request.headers);
        let name = await JWT.verify(token, TOKEN_SECRET_KEY).name;
        data[include] = value;
        condition.administrator = name;
    } else if (type === 'toggle_status') {
        data[include] = parseInt(value);
        condition.id = id;
    }

    await administratorHandle.update({condition, data}).then((result) => {
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
        ctx.body = JSON.stringify({error});
    });
};

// 当前用户
let me = async (ctx, next) => {
    let token = getToken(ctx.request.headers);
    await JWT.verify(token, TOKEN_SECRET_KEY, (error, decoded) => {
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

    let token = getToken(ctx.request.headers);
    let administrator = await JWT.verify(token, TOKEN_SECRET_KEY);

    await administratorHandle.fetch({}, administrator.name, skip, per_page).then((result) => {
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
    remove,
    me,
    list,
    login,
    logout
};
