/**
 * 问题 schemas
 * Created by 王佳欣 on 2018/5/10.
 */

import Mongoose from 'mongoose';
import {ObjectID} from 'mongodb';

// 定义模式
let QuestionSchema = new Mongoose.Schema({
    title: String,
    score: String,
    sortnum: Number,
    question_type: String,
    photo: String,
    answer: String,
    choices: Array,
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
QuestionSchema.pre('save', async function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }

    next();
});

// 方法
QuestionSchema.methods = {

};

// 静态查询方法
QuestionSchema.statics = {
    fetch: function (query ,skip, limit) {
        return this.find({...query}, {password: 0}).skip(skip).limit(parseInt(limit)).sort('meta.updateAt');
    },
    findById: function (id) {
        return this.findOne({_id: ObjectID(id)}, {password: 0, meta: 0});
    },
    update: async function (data) {
        return this.update({administrator: name}, {$set: data});
    }
};

export default QuestionSchema;