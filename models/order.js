var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Order = new Schema({
  orderId: {
    type: Number,
    require: true
  },
  createTime: {
	  type: String,
	  require: true
  },
  priority: {
	  type: Number,
	  require: true
  },
  userId: {
	  type: String,
	  require: true
  },
  car: {
	  type: {
		  type: Number,
		  require: true
	  },
	  color: {
		  type: Number,
		  require: true
	  }
  }
});

//module.exports = mongoose.model('Order', Order);