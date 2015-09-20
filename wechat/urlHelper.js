var config = require('../config/config.json');
var env = process.env.NODE_ENV || "development";

exports.getAccessTokenUrl = function(code) {
	return 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + config[env].appID + '&code=' + code + '&grant_type=authorization_code';
}