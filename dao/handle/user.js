import Mongoose from 'mongoose';
import User from '../models/user';
let Promise = Mongoose.Promise;

module.exports = {
    // 增加数据
    create: async ({username, password}) => {
        let _user = new User({
            username,
            password,
            status: 1
        });

        let result = await _user.save();
        return result;
    },
    // 修改数据
    update: (user) => {

    },
    // 禁用
    disable: function(id) {

    },
    // 获取
    fetch: function(page, size) {
        _user.fetch()
    },
    // 单条
    findByName: async function (name) {
        return User.findByName(name);
    }
};