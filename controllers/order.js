var i18n = require('i18n');
var sharingHandler = require('../wechat/sharing.js');
var env = process.env.NODE_ENV || "development";
var config = require('../config/config.json');

exports.new = function(req, res, next) {
  res.render('order/order_new', {});
};

exports.show = function(req, res, next) {
  res.render('order/order_show', {});
};

exports.select = function(req, res, next) {
  //console.log('userID: ' + req.query.access_token);
  var timestamp = sharingHandler.createTimestamp();
  var nonceStr = sharingHandler.createNonceStr();
  var url = req.protocol + '://' + req.hostname + ':33202/inno'+ req.url; //获取当前url
  //console.log("url: "+ url);
  sharingHandler.sign(timestamp, nonceStr, url)
      .then(function(signature) {
        res.render('order/order', {order_js_src: i18n.__('order_js_src'), appId: config[env].wechat.appID, timestamp: timestamp, nonceStr: nonceStr, signature: signature});
      })

};

exports.state = function(req, res, next) {
  res.render('state/state', {});
};