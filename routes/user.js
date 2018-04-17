import Router from'koa-router';
import userControl from '../controllers/user';

let router = new Router({
    prefix: '/api/user'
  }); 

router.get('/:name', userControl.get);
router.post('/signin', userControl.signin);

export default router;