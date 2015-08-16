exports.create = function(req, res, next) {
    //TODO create sale order
    res.status(201)
        .json({
            id: 18,
            status: 1
        });
}

exports.find = function(req, res, next) {
    //TODO find
    var orderId = req.params.orderId;
    res.status(200)
        .json({
            id: orderId,
            status: 2,
            curOperation: 2
        });
}