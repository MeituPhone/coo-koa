import  Mongoose from "mongoose";
import QuestionSchema from '../schemas/question'

let Question = Mongoose.model('Question', QuestionSchema);

export default Question