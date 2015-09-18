var mongoose = require('mongoose');
var User = require('../../models/user.js');
var UserService = require('../../service/user.js');

//provided for create user
exports.create = function(req,res,next){
	var user = new User(req.body);
	UserService.create(user).then(function(result){
		res.send(result);
	});
}