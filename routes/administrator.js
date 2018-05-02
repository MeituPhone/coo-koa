import Router from'koa-router';
import passport from 'passport';
import '../utils/passport';
import administratorControl from '../controllers/administrator';
import {verifyToken} from '../utils/tokenManager';

let router = new Router({
    prefix: '/api/administrator'
});

// 用户
router.get('/:name', passport.authenticate('bearer', { session: false }), verifyToken, administratorControl.get);
// 当前用户
router.get('/', passport.authenticate('bearer', { session: false }), verifyToken, administratorControl.current);
// 创建
router.post('/', passport.authenticate('bearer', { session: false }), verifyToken, administratorControl.create);

// 登录
router.post('/auth/login', administratorControl.login);
// 退出
router.get('/auth/logout', administratorControl.logout);

export default router;