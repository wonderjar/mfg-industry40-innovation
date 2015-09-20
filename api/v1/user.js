var mongoose = require('mongoose');
var User = require('../../test/users.js');
var UserService = require('../../service/user.js');

exports.create = function(req,res,next){
	var user = new User(req.body);
	UserService.create(user).then(function(result){
		res.send(result);
	});
}