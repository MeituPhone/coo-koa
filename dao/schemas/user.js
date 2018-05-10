import { Schema } from 'mongoose';
import { encrypt, validate } from '../../utils/encryption';

// 定义模式
let UserSchema = new Schema({
    uid: String,
    username: {
        type: String,
        unique: true,
        require: true,
    },
    password: String,
    userinfo: Object,
    platform: String,
    status: Number,
}, {
        versionKey: false
    });

// 新增之前的中间件
UserSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        this.password = await encrypt(this.password);
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
    // findById: function (id) {
    //     return this.findOne({ uid: id }).exec();
    // }
};

export default UserSchema;