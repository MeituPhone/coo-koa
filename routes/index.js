import Router from 'koa-router';
import user from './user';
import administrator from './administrator';
import question from './question';

let router = Router();

//user
router.use(user.routes(), user.allowedMethods());

//admin
router.use(administrator.routes(), administrator.allowedMethods());

//question
router.use(question.routes(),question.allowedMethods());

//examination

//article

//articleType

//articleTag

export default router;