import Router from 'koa-router';
import biliblili from './bilibili';
import user from './user';
import administrator from './administrator';

let router = Router();

router.use(biliblili.routes(), biliblili.allowedMethods());
router.use(user.routes(), user.allowedMethods());
router.use(administrator.routes(), administrator.allowedMethods());

export default router;