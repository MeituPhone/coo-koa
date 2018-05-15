/**
 * 简单H5
 * Created by 王佳欣 on 2018/5/14.
 */
import Mongoose from 'mongoose';
import {ObjectID} from 'mongodb';
import Autoincrement from '../../utils/autoincrement';

// 定义模式
let EasyH5Schema = new Mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    name: String,
    type: String,
    content: Array,
    status: {
        type: Number,
        default: 0
    },
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

EasyH5Schema.pre('save', async function (next) {
    if (this.isNew) {
        this.id = await Autoincrement('easyh5');
    }
    next();
});

// 静态查询方法
EasyH5Schema.statics = {
    fetch: function (query, skip, limit) {
        return this.find({...query}).skip(skip).limit(parseInt(limit)).sort('meta.updateAt');
    },
    removeById: async function(id) {
        return this.remove({_id: ObjectID(id)});
    },
    findById: function (id) {
        return this.findOne({id: id}, {_id: 0, meta: 0});
    },
    updateInclude: async function ({condition, data}) {
        let _condition = {};
        if (condition._id) {
            _condition._id = ObjectID(condition.id);
        } else {
            _condition = condition;
        }

        return this.update(_condition, { $set: data});
    }
};

export default EasyH5Schema;