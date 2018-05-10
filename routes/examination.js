import Router from 'koa-router';
import passport from 'passport';
import '../utils/passport'; 
import { verifyToken } from "../utils/tokenManager";
import examinationControl from '../controllers/examination'

let router = new Router({
    prefix:'/api/examination'
});

router.get('/',examinationControl.list);

router.post('/',examinationControl.create);

router.get('/:id',examinationControl.get);

router.put('/:id',examinationControl.update);

router.delete('/:id',examinationControl.disable);

export default router;