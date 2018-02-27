const mongoose = require('mongoose');
let User = require('../models/user');
let Promise = mongoose.Promise;

module.exports = {
    // 增加数据
    create: ({username, password}) => {
        let _user = new User({
            username,
            password,
            status: 1
        });

        return new Promise((resolve, reject) => {
            _user.save((error, user) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(user);
                }
            });
        });
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
    findOne: function(id) {
        User.findById(id);
    }
};