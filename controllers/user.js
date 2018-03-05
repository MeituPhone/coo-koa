let UserHandle = require('../dao/handle/user');

// 登录接口:: post
let signin = async (ctx, next) => {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    let result = await UserHandle.create({username, password});
    ctx.body = JSON.stringify({
        result
    });
};

// 测试:: get
let get = async (ctx, next) => {
    let name = ctx.params.name;
    let user = await UserHandle.findByName(name);
    ctx.body = JSON.stringify({
        user
    });
};

module.exports = {
    signin,
    get
};