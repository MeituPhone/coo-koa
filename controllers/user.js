import userHandle from '../dao/handle/user';
import { expireToken, getToken } from "../utils/tokenManager";

// 注册:: post
let create = async (ctx, next) => {
    let { username, password } = ctx.request.body;
    try {
        let result = await userHandle.create({ username, password });
        ctx.body = result
    } catch (err) {
        ctx.throw(err.code, err.msg, err);
    }
};

// 更新信息:: put
let update = async (ctx, next) => {
    let { username, password } = ctx.request.body;
    try {
        let result = await userHandle.update(ctx.params.id, { username, password });
        ctx.body = result
    } catch (err) {
        ctx.status = 404;
        ctx.body = err;
    }
};

// 测试:: get
let get = async (ctx, next) => {
    try {
        let user = await userHandle.findById(ctx.params.id);
        ctx.body = user
    } catch (err) {
        ctx.status = err.code;
        ctx.body = err.msg;
    }
};


let getList = async (ctx, next) => {
    let { page, pagesize } = ctx.request.query;
    let users = await userHandle.fetch(page, pagesize);
    ctx.response.body = users;
}

let remove = async (ctx, next) => {
    let token = getToken(ctx.request.headers);
    let uid = ctx.request.body.uid;
    //TODO if is admin
    let user = await userHandle.disable(uid);
    ctx.body = user;
}

let login = async (ctx, next) => {
    let { username, password } = ctx.request.body;
    let user = await userHandle.login(username, password).then((user) => {
        ctx.body = user;
    }).catch((err) => {
        ctx.status = 400;
        ctx.body = err;
    })
}

let logout = async (ctx, next) => {

}

module.exports = {
    create,
    get,
    getList,
    login,
    logout,
    update,
    remove
};