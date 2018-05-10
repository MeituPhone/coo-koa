import Mongoose from "mongoose";
import ArticleTypeSchema from '../../schemas/article/articleType';

let ArticleType = Mongoose.model('ArticleType', ArticleTypeSchema);

export default ArticleType