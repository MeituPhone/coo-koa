import Router from 'koa-router';
import passport from 'passport';
import '../../utils/passport'; 
import { verifyToken } from "../../utils/tokenManager";
import articleTagControl from '../../controllers/article/aritcleTag'

let router = new Router({
    prefix:'/api/articleTag'
});

router.get('/',articleTagControl.list);

router.post('/',articleTagControl.create);

router.get('/:id',articleTagControl.get);

router.put('/:id',articleTagControl.update);

router.delete('/:id',articleTagControl.disable);

export default router;