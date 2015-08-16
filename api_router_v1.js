var express = require('express');
var router = express.Router();
var order = require('./api/v1/order.js');

router.get('/orders/:orderId', order.find);
router.post('/orders', order.create);

module.exports = router;