/**
 * 管理员表
 * Created by 王佳欣 on 2018/4/28.
 */
import Mongoose from 'mongoose';
import {ObjectID} from 'mongodb';
import {validate, encrypt} from '../../utils/encryption';

// 定义模式
let AdministratorSchema = new Mongoose.Schema({
    administrator: {
        type: String,
        unique: true,
        require: true,
    },
    password: String,
    nickname: String,
    avatar: String,
    status: Number,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
}, {
    versionKey: false
});



// 新增之前的中间件
AdministratorSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        this.password = await encrypt(this.password);
    }

    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }

    next();
});

// 方法
AdministratorSchema.methods = {
    comparePassword: async function (password) {
        return await validate(password, this.password);
    }
};

// 静态查询方法
AdministratorSchema.statics = {
    fetch: function (query, name, skip, limit) {
        return this.find({...query, administrator: { $ne: name }}, {password: 0}).skip(skip).limit(parseInt(limit)).sort('meta.updateAt');
    },
    removeById: async function(id) {
        return this.remove({_id: ObjectID(id)});
    },
    findByName: async function(name, checkPwd = false) {
        let options = {
            meta: 0
        };

        if (!checkPwd) {
            options.password = 0;
        }
        return await this.findOne({administrator: name}, options);
    },
    findById: function (id) {
        return this.findOne({_id: ObjectID(id)}, {password: 0, meta: 0});
    },
    updateInclude: async function ({condition, data}) {
        let _condition = {};
        if (condition.id) {
            _condition._id = ObjectID(condition.id);
        } else {
            _condition = condition;
        }

        return this.update(_condition, { $set: data});
    }
};

export default AdministratorSchema;