import { Schema } from "mongoose";

let ArticleTypeSchema = new Schema({
    type: String
})

module.exports = ArticleTypeSchema;