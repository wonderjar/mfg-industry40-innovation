var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	sex: Number,
	openid: String,
	nickname:String,
	province:String,
	city:	String,
	country:String,
	headimgurl:String,
	unionid:String	
});

//module.exports = mongoose.model('User',userSchema);