const router = require('koa-router')();
const userControl = require('../controllers/user');

router.get('/:name', userControl.get);
router.post('/signin', userControl.signin);

module.exports = router;