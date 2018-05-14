import Router from'koa-router';
import passport from 'passport';
import '../utils/passport';
import administratorControl from '../controllers/administrator';
import {verifyToken} from '../utils/tokenManager';

let router = new Router({
    prefix: '/api/administrators'
});

// 用户
router.get('/:id', passport.authenticate('admin', { session: false }), verifyToken, administratorControl.get);

// 列表
router.get('/', passport.authenticate('admin', { session: false }), verifyToken, administratorControl.list);

// 创建
router.post('/', passport.authenticate('admin', { session: false }), verifyToken, administratorControl.create);

// 创建
router.put('/', passport.authenticate('admin', { session: false }), verifyToken, administratorControl.update);

// 当前用户
router.get('/auth/me', passport.authenticate('admin', { session: false }), verifyToken, administratorControl.me);

// 登录
router.post('/auth/login', administratorControl.login);

// 退出
router.get('/auth/logout', administratorControl.logout);

export default router;
