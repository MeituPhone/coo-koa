import { Schema } from "mongoose";

let ArticleTagSchema = new Schema({
    tag: String
})

module.exports = ArticleTagSchema;