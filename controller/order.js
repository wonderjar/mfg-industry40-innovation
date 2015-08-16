exports.new = function(req, res, next) {
  res.render('order/order_new', {});
};

exports.show = function(req, res, next) {
  res.render('order/order_show', {});
}