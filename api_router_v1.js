var express = require('express');
var router = express.Router();
var order = require('./api/v1/order.js');
var analyse = require('./api/v1/analyse.js');

router.get('/orders/:orderId', order.find);
router.post('/orders', order.create);

router.get('/analyse',analyse.all);

module.exports = router;