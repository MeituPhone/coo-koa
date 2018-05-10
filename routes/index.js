import Router from 'koa-router';
import meitu from './meitu';
import user from './user';
import administrator from './administrator';
import question from './question';
import examination from './examination';
import article from './article/article';
import articleTag from './article/articleTag';
import articleType from './article/articleType';

let router = Router();

router.use(meitu.routes(), meitu.allowedMethods());

//user
router.use(user.routes(), user.allowedMethods());

//admin
router.use(administrator.routes(), administrator.allowedMethods());


//question
router.use(question.routes(),question.allowedMethods());

//examination
router.use(examination.routes(),examination.allowedMethods());

//article
router.use(article.routes(),article.allowedMethods());

//articleType
router.use(articleType.routes(),articleType.allowedMethods());

//articleTag
router.use(articleTag.routes(),articleTag.allowedMethods());

export default router;
