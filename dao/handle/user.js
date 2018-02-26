const mongoose = require('mongoose');
let User = require('../models/user');

module.exports = {
    // 增加数据
    create: ({username, password}) => {
        let _user = new User({
            username,
            password,
            status: 1
        });

        _user.save((err, user) => {
            if (err) {
                console.log(err);
            } else {
                console.log(user._id);
            }
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

    },
    // 单条
    findOne: function(id) {

    }
};