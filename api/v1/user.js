var User = require('../../models/user.js');
var UserService = require('../../service/user.js');

exports.create = function(req, res, next){
	UserService.create(req.body).then(function(result){
		res.send(result);
	});
}