import Mongoose from "mongoose";

let counterSchema = new Mongoose.Schema({
    key: String,
    value: Number
})

let Counter = Mongoose.model('counter', counterSchema);

export default async (key) => {
    let counter = await Counter.findOne({ key: key }).exec();
    if (counter) {
        await counter.update({ value: counter.value + 1 });
    } else {
        let counter = new Counter({
            key: key,
            value: 1
        })
        await counter.save();
    }
    return counter.value
}