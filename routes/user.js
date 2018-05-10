import Router from 'koa-router';
import passport from 'passport'
import '../utils/passport';
import userControl from '../controllers/user';
import { verifyToken } from '../utils/tokenManager';

let router = new Router({
  prefix: '/api/user'
});

router.get('/', userControl.getList);

router.post('/', userControl.create);

router.get('/:id', userControl.get)

router.put('/:id', userControl.update);

router.delete('/:id', userControl.disable);

router.post('/session', userControl.login);

router.delete('/session/:token', userControl.logout);


export default router;