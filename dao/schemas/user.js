let mongoose = require('mongoose');

// 定义模式
let UserSchema = new mongoose.Schema({
    username: String,
    password: String,
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
    fetch: function(cb) {
       return this.find({}).sort('meta.updateAt');
       exec(cb);
    },
    findById: function(id, cb) {
        return this.findOne({_id: id});
        exec(cb);
    }
};

module.exports = UserSchema;