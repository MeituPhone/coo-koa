import { model } from "mongoose";
import ArticleTagSchema from '../../schemas/article/articleTag'

let ArticleTag = model('Article',ArticleTagSchema);

export default ArticleTag