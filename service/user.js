var User = require('../models/user.js');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

exports.findByOpenId = function(openId) {
	return User.findOne({
		openid: openId
	});
}

exports.create = function(user){
	user._id = new ObjectId;
	var newUser = new User(user);
	return newUser.save();
};
