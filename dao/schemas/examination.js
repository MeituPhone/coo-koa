import { Schema } from "mongoose";
import Question from '../models/question';

let ExaminationSchema = new Schema({
    id: Number,
    title: String,
    questions: [Number]
})

ExaminationSchema.static = {
    findById: function (id) {
        return this.findOne({id:id}).populate({path:'id',moduleQuestion}).exec()
    },
    fetch: function (query, skip, limit) {
        return this.find(...query).populate({path:'id',moduleQuestion}).skip(skip).limit(limit).sort('meta.updateAt').exec();
    }
}

export default ExaminationSchema;