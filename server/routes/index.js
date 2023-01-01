const Router = require('express');
const router = new Router();
const client = require('./clientRouter');
const user = require('./userRouter');

router.use('/user', user);
router.use('/client', client);

module.exports = router;
