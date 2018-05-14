import  Mongoose from "mongoose";
import QuestionSchema from '../../schemas/exam/question'

let Question = Mongoose.model('Question', QuestionSchema);

export default Question