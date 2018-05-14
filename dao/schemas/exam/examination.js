import { Schema } from "mongoose";
import Question from '../../models/exam/question';
import Autoincrement from '../../utils/autoincrement';

let ExaminationSchema = new Schema({
    id: {
        type: Number,
        unique: true
    },
    title: String,
    questions: [Number],
    status: Number
}, {
        versionKey: false
    });

ExaminationSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.id = await Autoincrement('examination');
    }

    next();
})

ExaminationSchema.statics = {
    findById: function (id) {
        return this.findOne({ id: id })
            // .populate({ path: 'id', Question })
            .exec()
    },
    fetch: function (query, skip, limit) {
        return this.find(...query)
            // .populate({ path: 'id', Question })
            .skip(skip).limit(limit).sort('meta.updateAt').exec();
    }
}

export default ExaminationSchema;