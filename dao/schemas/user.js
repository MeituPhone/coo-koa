import Mongoose from 'mongoose';

// 定义模式
let UserSchema = new Mongoose.Schema({
    uid: String,
    username: String,
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
});

// 新增之前的中间件
UserSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }

    next();
});

// 静态查询方法
UserSchema.statics = {
    fetch: function() {
       return this.find({}).sort('meta.updateAt').exec();
    },
    findByName: function(name) {
        return this.findOne({username: name}).exec();
    }
};

module.exports = UserSchema;