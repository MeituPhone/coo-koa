import Router from 'koa-router';
import biliblili from './bilibili';
import user from './user';

let router = Router();

router.use(biliblili.routes(), biliblili.allowedMethods());
router.use(user.routes(), user.allowedMethods());

export default router;