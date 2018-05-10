import Router from 'koa-router';
import meitu from './meitu';
import user from './user';
import administrator from './administrator';

let router = Router();

router.use(meitu.routes(), meitu.allowedMethods());
router.use(user.routes(), user.allowedMethods());
router.use(administrator.routes(), administrator.allowedMethods());

export default router;
