
var mongoose = require('mongoose');
var Order = require('../../models/order.js');
var OrderService = require('../../service/order.js');


exports.create = function(req, res, next) {
	OrderService.create(req.body).then(function(result){
		res.status(201).json({
			id: result._id
		});
	},function(err){
		res.status(500).json({
			message: err
		});
	});
}


