import { Schema } from "mongoose";
import question from './question'

let ExaminationSchema = new Schema({
    id: Number,
    title: String,
    questions: [question.id]
})

ExaminationSchema.static = {
    fetch: function (query,skip,limit) {
        return this.find(...query).skip(skip).limit(limit).sort('meta.updateAt').exec();
    }
}

module.exports = ExaminationSchema;