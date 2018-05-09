import { Schema } from "mongoose";

let ArticleTagSchema = new Schema({
    tag: String
})

ArticleTagSchema.static = {
    fetch: function (query, skip, limit) {
        return this.find({ ...query }).skip(skip).limit(limit).sort('meta.updateAt').exec();
    },

    findByName: function (tag) {
        return this.findOne({tag:tag}).exec();
    }
}

export default ArticleTagSchema;