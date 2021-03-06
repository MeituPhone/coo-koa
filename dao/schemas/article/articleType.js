import { Schema } from "mongoose";

let ArticleTypeSchema = new Schema({
    type: {
        type: String,
        unique: true,
        required: true
    },
    status:Number
},{
    versionKey:false
})

ArticleTypeSchema.statics = {
    fetch: function (query, skip, limit) {
        return this.find({ ...query }).skip(skip).limit(limit).sort('meta.createAt').exec();
    },
    
    findByName: function (type) {
        return this.findOne({ type: type }).exec();
    }
}

export default ArticleTypeSchema;