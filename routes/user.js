import Router from 'koa-router';
import userControl from '../controllers/user';

let router = new Router({
  prefix: '/api/user'
});

router.get('/', userControl.getList);

router.post('/', userControl.create);

router.get('/:id',userControl.get)

router.put('/:id', userControl.update);

router.delete('/:id',userControl.remove);

router.post('/session',userControl.login);

router.delete('/session/:token',userControl.logout);


export default router;