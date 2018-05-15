/**
 * Created by 王佳欣 on 2018/5/14.
 */

import Router from'koa-router';
import passport from 'passport';
import '../../utils/passport';
import easyH5Control from '../../controllers/h5/easyH5';
import {verifyToken} from '../../utils/tokenManager';

let router = new Router({
    prefix: '/api/easy_h5'
});

// 用户
router.get('/:id', easyH5Control.get);

// 列表
router.get('/', passport.authenticate('admin', { session: false }), verifyToken, easyH5Control.list);

// 创建
router.post('/', passport.authenticate('admin', { session: false }), verifyToken, easyH5Control.create);

// 用户
router.del('/:id', passport.authenticate('admin', { session: false }), verifyToken, easyH5Control.remove);

// 创建
router.put('/:id', passport.authenticate('admin', { session: false }), verifyToken, easyH5Control.update);


export default router;
