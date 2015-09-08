var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Order = new Schema({
  orderId: {
    type: Number,
    require: true
  },
  type: {
    type: Number,
    require: true
  },
  color: {
    type: Number,
    require: true
  },
  //TODO user
});

module.exports = mongoose.model('Order', Order);