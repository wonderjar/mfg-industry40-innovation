var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	_id: String,
	sex: Number
});

module.exports = mongoose.model('User',userSchema);