import Joi from "joi";
import Msg from "../consts/msg";
import Validation from "../consts/validation";
import userHandle from '../dao/handle/user';
import { expireToken, getToken } from "../utils/tokenManager";

/**
 * @description 用户注册
 */
let create = async (ctx, next) => {
    let { username, password } = ctx.request.body;
    //参数验证
    const schema = Joi.object().keys({
        username: Joi.string().regex(Validation.USRNAME_REG).required(),
        password: Joi.string().regex(Validation.PASSWORD_REG).required()
    })

    let joiError = Joi.validate({ username, password }, schema).error;

    if (joiError) {
        ctx.status = 400;
        ctx.body = Msg.PARAMETER_ERROR;
        ctx.body.msg = error.message;
        let err = { status: 400, error: Msg.PARAMETER_ERROR };
        err.error.msg = joiError.message;
        throw (err);
    }

    let result = await userHandle.create({ username, password });
    ctx.body = {};
};

/**
 * @description 更新用户信息
 */
let update = async (ctx, next) => {
    let { username, password } = ctx.request.body;
    let result = await userHandle.update(ctx.params.id, { username, password });
    ctx.body = result
};


/**
 * @description 根据id获取用户
 */
let get = async (ctx, next) => {
    let user = await userHandle.findById(ctx.params.id);
    ctx.body = user
};

/**
 * @description 获取用户列表
 */
let getList = async (ctx, next) => {
    let { page = 1, per_page = 10 } = ctx.request.query;

    page = parseInt(page);
    per_page = parseInt(per_page);

    let skip = (page - 1) * per_page;

    let users = await userHandle.fetch({}, skip, per_page);
    ctx.response.body = users;
}

/**
 * @description 禁用用户
 */
let disable = async (ctx, next) => {
    let token = getToken(ctx.request.headers);
    let uid = ctx.request.body.uid;

    //TODO if is admin
    let result = await userHandle.disable(uid);
    ctx.body = user;
}

/**
 * @description 登陆
 */
let login = async (ctx, next) => {
    let { username, password } = ctx.request.body;
    let user = await userHandle.login(username, password)
    ctx.body = user;
}

/**
 * @description 登出
 */
let logout = async (ctx, next) => {
    expireToken(ctx);
    ctx.body = {};
}

export default {
    create,
    get,
    getList,
    login,
    logout,
    update,
    disable
};