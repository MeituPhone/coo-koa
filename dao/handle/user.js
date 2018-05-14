import Mongoose from 'mongoose';
import User from '../models/user';
import Jwt from "jsonwebtoken";
import { USER_TOKEN_SECRE_KEY } from '../../consts';
import Msg from '../../consts/msg';
import autoincrement from '../utils/autoincrement'

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
            throw { status: 400, error: Msg.EXIST_ERROR };
        }

        try {
            return await _user.save();
        } catch (error) {
            //TODO log
            throw { status: 500, error: Msg.CREATE_ERROR };
        }
    },
    // 修改数据
    update: async (id, user) => {
        let _user = await User.findById(id);
        if (_user) {
            return await _user.update(user);
        } else {
            throw { status: 404, error: Msg.NO_FOUND_ERROR };
        }
    },
    // 禁用
    disable: async (id) => {
        let user = await User.findById(id);
        if (user) {
            return await user.update({ status: 0 });
        } else {
            throw { status: 404, error: Msg.NO_FOUND_ERROR };
        }
    },
    able: async (id) => {

    },
    // 获取
    fetch: async (query = {}, skip = 1, limit = 10) => {
        return await User.fetch(query, skip, limit)
    },
    // 单条
    findByName: async (name) => {
        return await User.findByName(name);
    },
    findById: async (id) => {
        return await User.findById(id);
    },
    login: async (username, password) => {
        let user = await User.findByName(username);
        if (user) {
            let flag = await user.comparePassword(password);
            if (flag) {
                let token = Jwt.sign(
                    { name: user.username },
                    USER_TOKEN_SECRE_KEY,
                    { expiresIn: 60 * 60 }
                );
                return { token };
            } else {
                throw { status: 400, error: Msg.PASSWORD_ERROR };
            }
        } else {
            throw { status: 400, error: Msg.NO_FOUND_ERROR };
        }
    },
};