import Router from 'koa-router';
import passport from 'passport';
import '../utils/passport'; 
import { verifyToken } from "../utils/tokenManager";
import questionControl from '../controllers/question'

let router = new Router({
    prefix:'/api/question'
});

router.get('/',questionControl.list);

router.post('/',questionControl.create);

router.get('/:id',questionControl.get);

router.put('/:id',questionControl.update);

router.delete('/:id',questionControl.disable);

export default router;