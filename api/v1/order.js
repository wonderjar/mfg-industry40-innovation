
var mongoose = require('mongoose');
var Order = require('../../models/order.js');

exports.create = function(req, res, next) {

    mongoose.connect('mongodb://localhost/innovation');

    var order = new Order({
        orderId: 18,
        type: 3,
        color: 6
    });

    //TODO maybe call service layer
    order.save(function(err) {
        if(err) {
            res.status(500)
                .json({
                    message: err
                });
        }
        else {
            res.status(201)
                .json({
                    orderId: 18
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