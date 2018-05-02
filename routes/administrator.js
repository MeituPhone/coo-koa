import Router from'koa-router';
import administratorControl from '../controllers/administrator';

let router = new Router({
    prefix: '/api/administrator'
});

router.get('/:name', administratorControl.get);
router.post('/', administratorControl.create);


export default router;