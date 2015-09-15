var express = require('express');
var router = express.Router();
var order = require('./controllers/order');

router.get('/order/order_new', order.new);
router.get('/order/order_show', order.show);
router.get('/order/order', order.select);
router.get('/order/state', order.state);
router.get('/test', order.test);

router.get('/', function(req, res, next) {
    res.render('index');
});

module.exports = router;