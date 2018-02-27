const router = require('koa-router')();
const userControl = require('../controllers/user');

router.get('/api/user/:name', userControl.get);
router.post('/api/signin', userControl.signin);


module.exports = router;