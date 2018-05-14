import { Schema } from "mongoose";

let ArticleTagSchema = new Schema({
    tag: {
        type: String,
        unique: true,
        required: true
    },
    status:Number
},{
    versionKey:false
})

ArticleTagSchema.statics = {
    fetch: function (query, skip, limit) {
        return this.find({ ...query }).skip(skip).limit(limit).sort('meta.updateAt').exec();
    },

    findByName: function (tag) {
        return this.findOne({ tag: tag }).exec();
    }
}

export default ArticleTagSchema;