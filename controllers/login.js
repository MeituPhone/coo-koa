// 登录接口:: post
let signin = async (ctx, next) => {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    ctx.body = JSON.stringify({
        username,
        password
    });
};

// 测试:: get
let test = async (ctx, next) => {
    name = ctx.params.name;
    ctx.body = JSON.stringify({
        name
    });
};

module.exports = {
    signin,
    test
};