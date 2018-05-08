import { model } from "mongoose";
import ArticleTypeSchema from '../../schemas/article/articleType'

let ArticleType = model('Article',ArticleTypeSchema);

module.exports = ArticleType