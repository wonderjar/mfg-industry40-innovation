var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserdCode = new Schema({
  _id: Schema.Types.ObjectId,
  code: String,
});

module.exports = mongoose.model('UserdCode', UserdCode);