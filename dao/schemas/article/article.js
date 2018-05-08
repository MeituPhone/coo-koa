import { Schema } from "mongoose";

let ArticleSchema = new Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    title: String,
    description: String,
    Summary:String,
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
})

module.exports = ArticleSchema;