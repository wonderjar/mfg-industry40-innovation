
var mongoose = require('mongoose');
var Order = require('../../models/order.js');
var OrderService = require('../../service/order.js');


exports.create = function(req, res, next) {
	var params = req.body;
	if(req.session && req.session.userID) {
		params.userId = req.session.userID;
	}

	console.log(params);

	var newOrder = {
		erpOrderId: params.erpOrderId,
		priority: params.priority,
		userId: params.userId,
		car: {
			type: params.type,
			color: params.color
		}
	}

	OrderService.create(newOrder).then(function(result){
		console.log('api/v1/order.js-create:');
		console.log(result);
		res.status(201).json({
			id: result._id
		});
	});
}


