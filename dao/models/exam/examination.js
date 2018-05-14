import  Mongoose from "mongoose";
import ExmainationSchema from '../../schemas/exam/examination'

let Examination = Mongoose.model('Examination', ExmainationSchema);

export default Examination;