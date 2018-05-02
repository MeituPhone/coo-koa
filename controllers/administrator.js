/**
 * 管理员控制器
 * Created by 王佳欣 on 2018/4/28.
 */
import administratorHandle from'../dao/handle/administrator';

// 注册:: post
let create = async (ctx, next) => {
    let { administrator, password, nickname, avatar } = ctx.request.body;
    await administratorHandle.create({administrator, password, nickname, avatar}).then((result) => {
        ctx.body = JSON.stringify(result);
    }).catch((error) => {
        ctx.body = JSON.stringify({
            error: {
                code: error.code,
                msg: ''
            }
        });
    });
};

// 更新信息:: put
let update = async (ctx, next) => {
    let {username, password} = ctx.request.body;
    let result = userHandle.update({username, password});
    cxt.body = JSON.stringify({
        result
    });
};

// 测试:: get
let get = async (ctx, next) => {
    let name = ctx.params.name;
    let administrator = await administratorHandle.findByName(name) || {};
    ctx.body = JSON.stringify(administrator);
};

module.exports = {
    create,
    get
};