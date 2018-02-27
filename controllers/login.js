let UserHandle = require('../dao/handle/user');

// 登录接口:: post
let signin = async (ctx, next) => {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    UserHandle.create({username, password}).then((user) => {
        console.log(user);
    });
    // User.featch(function(err, user){
    //     ctx.body = JSON.stringify(user);
    // });
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