import { model } from "mongoose";
import QuestionSchema from '../schemas/question'

let Question = model('Question', QuestionSchema);

export default Question