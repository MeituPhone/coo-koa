import Mongoose from "mongoose";
import ArticleTagSchema from '../../schemas/article/articleTag'

let ArticleTag = Mongoose.model('ArticleTag', ArticleTagSchema);

export default ArticleTag