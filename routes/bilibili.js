import Router from 'koa-router';
import bilibiliControl from '../controllers/bilibili';

let router = new Router({
    prefix: '/api/bilibili'
});

router.get('/ding', bilibiliControl.ding);

export default router;
