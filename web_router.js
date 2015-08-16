var express = require('express');
var router = express.Router();
var order = require('./controller/order');

router.get('/orders/new', order.new);
router.get('/orders/show', order.show);

router.get('/', function(req, res, next) {
    res.render('index');
});

module.exports = router;