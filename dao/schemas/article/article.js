import { Schema } from "mongoose";
import Autoincrement from '../../utils/autoincrement'

let ArticleSchema = new Schema({
    id: {
        type: Number,
        unique: true,
    },
    title: String,
    description: String,
    summary: String,
    keyword: String,
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'ArticleTag'
    }],
    type: {
        type: Schema.Types.ObjectId,
        ref: 'ArticleType'
    },
    authorName: String,
    content: String,
    remark: String,
    status: Number
}, {
        versionKey: false
    })


ArticleSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.id = await Autoincrement('article');
    }

    next();
})

ArticleSchema.statics = {
    fetch: function (query, skip, limit) {
        return this
            .find({ ...query })
            .populate('tags')
            .populate('type')
            .skip(skip)
            .limit(limit)
            .sort('meta.updateAt')
            .exec();
    },
    findById: function (id) {
        return this
            .findOne({ id: id })
            .populate('tags')
            .populate('type')
            .exec();
    }
}

export default ArticleSchema;