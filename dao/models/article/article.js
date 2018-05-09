import { model } from "mongoose";
import ArticleSchema from '../../schemas/article/article'

let Article = model('Article', ArticleSchema);

export default Article