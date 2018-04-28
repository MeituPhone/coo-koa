import Router from'koa-router';
import userControl from '../controllers/user';

let router = new Router({
    prefix: '/api/user'
  }); 

router.get('', userControl.get);
router.post('', userControl.create);


export default router;