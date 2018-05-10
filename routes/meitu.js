import Router from 'koa-router';
import bilibiliControl from '../controllers/meitu';

let router = new Router({
    prefix: '/api/bilibili'
});

router.get('/ding', bilibiliControl.ding);

export default router;
