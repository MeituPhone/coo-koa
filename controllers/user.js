import userHandle from '../dao/handle/user';
import { expireToken, getToken } from "../utils/tokenManager";

// 注册:: post
let create = async (ctx, next) => {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    try {
        let result = await userHandle.create({ username, password });
        ctx.body = result
    } catch (err) {
        ctx.throw(err.code, err.msg, err);
    }
};

// 更新信息:: put
let update = async (ctx, next) => {
    console.log(ctx.request.path);
    //TODO 写util
    let pathArray = ctx.request.path.split('/');
    let id = pathArray[pathArray.length-1];
    let { username, password } = ctx.request.body;
    try {
        let result = await userHandle.update(id,{ username, password });
        ctx.body = result
    } catch (err) {
        ctx.throw(err.code, err.msg, err);
    }
};

// 测试:: get
let get = async (ctx, next) => {
    let name = ctx.request.query.name;
    let user = await userHandle.findByName(name);
    ctx.body = user
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
    }).catch((error) => {
        ctx.throw(500, error.message, { msg: error.message });
        // error
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