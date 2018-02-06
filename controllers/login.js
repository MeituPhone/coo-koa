// 登录接口:: post
let signin = async (ctx, next) => {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    console.log('sss');
    ctx.body = JSON.stringify({
        username,
        password
    });
};

// 测试:: get
let test = async (ctx, next) => {
    let name = ctx.params.name;
    ctx.body = JSON.stringify({
        name,
        page: 'page/login.js'
    });
};

module.exports = {
    signin,
    test
};