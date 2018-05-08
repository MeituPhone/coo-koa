import { model } from "mongoose";
import ArticleTagSchema from '../../schemas/article/articleTag'

let ArticleTag = model('Article',ArticleTagSchema);

module.exports = ArticleTag