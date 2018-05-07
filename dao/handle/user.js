import Mongoose from 'mongoose';
import User from '../models/user';
import Jwt from "jsonwebtoken";
import { TOKE_SECRET_KEY } from '../../consts';
import MSG from '../../consts/msg';

module.exports = {
    // 增加数据
    create: async ({ uid, username, password, userinfo, platform }) => {
        let _user = new User({
            uid,
            username,
            password,
            userinfo,
            platform,
            status: 1,
        });
        let user = await User.findByName(username);
        if (user) {
            throw ({ code: 400, msg: '用户已存在' })
        }
        return await _user.save();
    },
    // 修改数据
    update: async (id, user) => {
        let _user = await User.findById(id);
        if (_user) {
            // TODO 验证修改的字段
            return await _user.update(user);
        } else {
            throw ({ code: 404, msg: 'user no found' });
        }
    },
    // 禁用
    disable: async (id) => {
        let user = await User.findById(id);
        if (user) {
            return await _user.update({ status: 0 });
        } else {
            throw ({ code: 404, msg: 'user no found' })
        }
    },
    able: async (id) => {

    },
    // 获取
    fetch: async (query = {}, page = 0, size = 10) => {
        return await User.fetch(query, page, size)
    },
    // 单条
    findByName: async (name) => {
        return User.findByName(name);
    },
    findById: async (id) => {
        return User.findById(id);
    },
    login: async (username, password) => {
        let user = await User.findByName(username);
        if (user) {
            let flag = await user.comparePassword(password);
            if (flag) {
                let token = Jwt.sign(
                    { name: user.username },
                    TOKE_SECRET_KEY,
                    { expiresIn: 60 * 60 }
                );
                return { token };
            } else {
                throw (MSG.PASSWORD_ERROR );
            }
        } else {
            throw (MSG.PASSWORD_ERROR);
        }
    },
};