import Router from 'koa-router';
import passport from 'passport';
import '../../utils/passport'; 
import { verifyToken } from "../../utils/tokenManager";
import articleTypeControl from '../../controllers/article/articleType'

let router = new Router({
    prefix:'/api/articleType'
});

router.get('/',articleTypeControl.list);

router.post('/',articleTypeControl.create);

router.get('/:id',articleTypeControl.get);

router.put('/:id',articleTypeControl.update);

router.delete('/:id',articleTypeControl.disable);

export default router;