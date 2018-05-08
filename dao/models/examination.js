import { model } from "mongoose";
import ExmainationSchema from '../schemas/examination'

let Examination = model('Examination', ExmainationSchema);

module.exports = Examination;