import Router from'koa-router';
import passport from 'passport';
import '../utils/passport';
import administratorControl from '../controllers/administrator';
import {verifyToken} from '../utils/tokenManager';

let router = new Router({
    prefix: '/api/administrator'
});

router.get('/:name',  passport.authenticate('bearer', { session: false }), verifyToken, administratorControl.get);
router.post('/', passport.authenticate('bearer', { session: false }), verifyToken, administratorControl.create);
router.post('/auth/login', administratorControl.login);
router.get('/auth/logout', administratorControl.logout);

export default router;