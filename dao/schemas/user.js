import Mongoose from 'mongoose';
import { validate, encrypt } from '../../utils/encryption';

// 定义模式
let UserSchema = new Mongoose.Schema({
    uid: String,
    username: {
        type:String,
        unique: true,
        require: true,
    },
    password: String,
    userinfo: Object,
    platform: String,
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
UserSchema.pre('save', async function (next) {
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

UserSchema.methods = {
    comparePassword: async function (password) {
        return await validate(password, this.password);
    }
}

// 静态查询方法
UserSchema.statics = {
    fetch: function (query, skip, limit) {
        return this.find({ ...query }, { password: 0 }).skip(skip).limit(limit).sort('meta.updateAt').exec();
    },
    findByName: function (name) {
        return this.findOne({ username: name }).exec();
    },
    findById: function (id) {
        return this.findOne({ uid: id }).exec();
    }
};

module.exports = UserSchema;