/**
 * 管理员控制器
 * Created by 王佳欣 on 2018/4/28.
 */
import MSG from '../consts/msg';
import administratorHandle from'../dao/handle/administrator';
import JWT from  'jsonwebtoken';
import tokenManager from '../utils/tokenManager';


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

// 测试
let get = async (ctx, next) => {
    let name = ctx.params.name;
    let administrator = await administratorHandle.findByName(name) || {};
    ctx.body = JSON.stringify(administrator);
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
    let decode = JWT.decode(ctx.header.authorization.replace('bearer ', ''));

    await administratorHandle.logout(decode.name).then((result) => {
        ctx.body = JSON.stringify({result});
    }).catch((error) => {
        ctx.body = JSON.stringify({error});
    });
};

module.exports = {
    create,
    get,
    login,
    logout
};