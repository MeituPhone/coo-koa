import Administrator from '../models/administrator';
import JWT from  'jsonwebtoken';
import {TOKE_SECRET_KEY} from '../../consts';
import MSG from '../../consts/msg';

export default {
    // 增加数据
    create: ({administrator, password, nickname, avatar}) => {
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
    // 修改
    update: ({include, value, name}) => {
        return Administrator.updateInclude({include, value, name});
    },
    // 禁用
    disable: function(id) {

    },
    // 获取
    fetch: function(query = {}, skip, limit) {
        return Administrator.fetch(query, skip, limit);
    },
    findByName: async function (name) {
        return await Administrator.findByName(name);
    },
    findById: async function (id) {
        return await Administrator.findById(id);
    },
    login: async function (name, password) {
        let administrator = await Administrator.findByName(name, true);

        if (administrator) {
            if (await administrator.comparePassword(password)) {
                // 生成 token
                let token = JWT.sign(
                    { name: administrator.administrator }
                    , TOKE_SECRET_KEY
                    , { expiresIn: 60 * 60 }
                );

                return {token};
            }

            // 密码错误
            return {...MSG.PASSWORD_ERROR};
        }

        // 用户名错误
        return {...MSG.NAME_ERROR};
    }
};