import Mongoose from "mongoose";
import ArticleSchema from '../../schemas/article/article'

let Article = Mongoose.model('Article', ArticleSchema);

export default Article