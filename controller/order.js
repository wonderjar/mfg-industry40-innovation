var i18n = require('i18n');

exports.new = function(req, res, next) {
  res.render('order/order_new', {});
};

exports.show = function(req, res, next) {
  res.render('order/order_show', {});
};

exports.select = function(req, res, next) {
  res.render('order/order', {order_js_src: i18n.__('order_js_src')});
};

exports.state = function(req, res, next) {
  res.render('state/state', {});
};