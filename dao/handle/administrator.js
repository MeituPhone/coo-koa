import Mongoose from 'mongoose';
import Administrator from '../models/administrator';

module.exports = {
    // 增加数据
    create: async ({administrator, password, nickname, avatar}) => {
        let _administrator = new Administrator({
            administrator,
            password,
            nickname,
            avatar,
            status: 1,
        });

        return new Promise((resolve, reject) => {
            _administrator.save((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(_administrator);
                }
            });
        });
    },
    // 修改数据
    update: (administrator) => {

    },
    // 禁用
    disable: function(id) {

    },
    // 获取
    fetch: function(page, size) {
        Administrator.fetch()
    },
    // 单条
    findByName: async function (name) {
        return Administrator.findByName(name);
    }
};