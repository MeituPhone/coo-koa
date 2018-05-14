import Router from 'koa-router';
import passport from 'passport'
import '../utils/passport';
import '../utils/userPassport';
import userControl from '../controllers/user';
import { verifyToken } from '../utils/tokenManager';

let router = new Router({
  prefix: '/api/user'
});

router.get('/', passport.authenticate('admin', { session: false }), verifyToken, userControl.getList);

router.post('/', userControl.create);

router.get('/:id', passport.authenticate('user', { session: false }), verifyToken, userControl.get)

router.put('/:id', passport.authenticate('user', { session: false }), verifyToken, userControl.update);

router.delete('/:id', passport.authenticate('admin', { session: false }), verifyToken, userControl.disable);

//登陆
router.post('/session', userControl.login);

//登出
router.delete('/session/:token', userControl.logout);


export default router;