var UsedCode = require('../models/usedCode');

exports.create = function(code){
	var newUsedCode = new UsedCode({
		code: code
	});
	return newUsedCode.save();
}

exports.findByCode = function(code) {
	return UsedCode.findOne({
		code: code
	});
}