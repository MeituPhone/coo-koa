import userHandle from'../dao/handle/user';

// 注册:: post
let create = async (ctx, next) => {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    let result = await userHandle.create({username, password});
    ctx.body = JSON.stringify({
        result
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
    let name = ctx.request.query.name;
    let user = await userHandle.findByName(name);
    ctx.body = JSON.stringify({
        user
    });
};

module.exports = {
    create,
    get
};