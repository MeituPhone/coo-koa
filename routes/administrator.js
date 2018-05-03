import Router from'koa-router';
import passport from 'passport';
import '../utils/passport';
import administratorControl from '../controllers/administrator';
import {verifyToken} from '../utils/tokenManager';

let router = new Router({
    prefix: '/api/administrator'
});

// 用户
router.get('/:id', passport.authenticate('bearer', { session: false }), verifyToken, administratorControl.get);

// 列表
router.get('/', passport.authenticate('bearer', { session: false }), verifyToken, administratorControl.list);

// 创建
router.post('/', administratorControl.create);

// 当前用户
router.get('/auth/me', passport.authenticate('bearer', { session: false }), verifyToken, administratorControl.me);

// 登录
router.post('/auth/login', administratorControl.login);

// 退出
router.get('/auth/logout', administratorControl.logout);

export default router;