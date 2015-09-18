var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	userId: String,
	gender: Number
});

module.exports = mongoose.model('User',userSchema);