//复用的 参数验证的常量

//密码的正则
const PASSWORD_REG = /^[a-zA-Z0-9]{3,30}$/;

//用户名的正则
const USRNAME_REG = /^[a-zA-Z0-9]{3,30}$/;

module.exports = {
    PASSWORD_REG,
    USRNAME_REG
}