const Router = require('koa-router');
const userControl = require('../controllers/user');

var routter = new Router({
    prefix: '/api/user'
  }); 

router.get('/:name', userControl.get);
router.post('/signin', userControl.signin);


module.exports = router;