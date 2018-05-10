import Router from 'koa-router';
import passport from 'passport';
import '../../utils/passport'; 
import { verifyToken } from "../../utils/tokenManager";
import articleControl from '../../controllers/article/article'

let router = new Router({
    prefix:'/api/article'
});

router.get('/',articleControl.list);

router.post('/',articleControl.create);

router.get('/:id',articleControl.get);

router.put('/:id',articleControl.update);

router.delete('/:id',articleControl.disable);

export default router;