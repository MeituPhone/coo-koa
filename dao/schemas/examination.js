import { Schema } from "mongoose";
import question from './question'

let ExaminationSchema = new Schema({
    id: Number,
    title: String,
    questions: [question.id]
})

module.exports = ExaminationSchema;