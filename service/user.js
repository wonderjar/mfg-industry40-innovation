var User = require('../../models/user.js');

exports.create = function(user){
	var newUser = new User(user);
	return newUser.save();
}