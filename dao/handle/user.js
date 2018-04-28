import Mongoose from 'mongoose';
import User from '../models/user';

module.exports = {
    // 增加数据
    create: async ({uid, username, password, userinfo, platform}) => {
        let _user = new User({
            uid,
            username,
            password,
            userinfo,
            platform,
            status: 1,
        });

        return await _user.save();
    },
    // 修改数据
    update: (user) => {

    },
    // 禁用
    disable: function(id) {

    },
    // 获取
    fetch: function(page, size) {
        User.fetch()
    },
    // 单条
    findByName: async function (name) {
        return User.findByName(name);
    }
};