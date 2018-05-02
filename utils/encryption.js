/**
 * 用户密码校验
 * Created by 王佳欣 on 2018/4/28.
 */
import Bcrypt from 'bcrypt';
import Promise from 'bluebird';
Promise.promisifyAll(Bcrypt);

// 密码密码加密
export const encrypt = async function (password) {
    let salt = await Bcrypt.genSaltAsync(10);
    return await Bcrypt.hashAsync(password, salt);
};

// 密码校验
export const validate = async function (password, hash) {
    return await Bcrypt.compareAsync(password, hash);
};
