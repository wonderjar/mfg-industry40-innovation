/**
 * Created by I309908 on 9/14/2015.
 */
var express = require('express');
var router = express.Router();
var order = require('./controllers/order');
var wechat = require('./controllers/wechat');


router.use('/wechat',wechat.subscribe);

module.exports = router;