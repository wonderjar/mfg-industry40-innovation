exports.new = function(req, res, next) {
  res.render('order/order_new', {});
};

exports.show = function(req, res, next) {
  res.render('order/order_show', {});
};

exports.select = function(req, res, next) {
  res.render('order/order', {});
};

exports.state = function(req, res, next) {
  res.render('state/state', {});
};