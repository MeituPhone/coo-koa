import Administrator from '../models/administrator';
import JWT from  'jsonwebtoken';
import {TOKE_SECRET_KEY} from '../../consts';
import MSG from '../../consts/msg';

module.exports = {
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
    },
    login: async function (name, password) {
        return new Promise((resolve, reject) => {
            Administrator.findByName(name).then((administrator) => {
                if (!administrator) {
                    reject({code: 600001, msg: '用户名不存在'});
                } else {
                    administrator.comparePassword(password).then((flag) => {
                        if (flag) {
                            let token = JWT.sign(
                                {name: administrator.administrator}
                                , TOKE_SECRET_KEY
                                , { expiresIn: 60 * 60 }
                            );

                            resolve({ token });
                        } else {
                            reject( {...PASSWORD_ERROR});
                        }
                    });
                }
            });
        });
    }
};