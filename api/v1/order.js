
var mongoose = require('mongoose');
var Order = require('../../models/order.js');

exports.create = function(req, res, next) {

    mongoose.connect('mongodb://localhost/innovation');
	console.log(req.body);
	
	var newOrder = new Order(req.body);
	newOrder.createTime = (new Date()).toLocaleString();
	newOrder.save(function(err){
		if(err){
			res.status(500).json({
				message: err
			});
		}else{
			res.status(201).json({
				orderId: req.body.orderId
			});
		}
		
	});
}

exports.find = function(req, res, next) {
    //TODO find
    var orderId = req.params.orderId;
    res.status(200)
        .json({
            id: orderId,
            status: 4,
            operationId: 3
        });
}