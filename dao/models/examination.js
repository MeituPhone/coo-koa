import  Mongoose from "mongoose";
import ExmainationSchema from '../schemas/examination'

let Examination = Mongoose.model('Examination', ExmainationSchema);

export default Examination;