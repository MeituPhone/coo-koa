import Mongoose from 'mongoose';
import Autoincrement from '../utils/autoincrement';

let QuestionSchema = new Mongoose.Schema({
    id: Number,
    title: String,
    score: Number,
    sortnum: Number,
    questionType: Number,
    photo: String,
    answer: Number,
    status: Number,
    choices: [{
        index: Number,
        content: String
    }]
}, {
        versionKey: false
    })


QuestionSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.id = await Autoincrement('question');
    }

    next();
})

QuestionSchema.method = {

}

QuestionSchema.statics = {
    fetch: function (query, skip, limit) {
        return this.find({ ...query }).skip(skip).limit(limit).sort('meta.updateAt').exec();
    },

    findById: function (id) {
        return this.findOne({ id: id }).exec();
    }
}

export default  QuestionSchema;