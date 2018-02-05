const router = require('koa-router')();
const loginControl = require('../controllers/login');

router.get('/api/test/:name', loginControl.test);
router.post('/api/signin', loginControl.signin);


module.exports = router;