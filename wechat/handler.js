var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var urlHelper = require('./urlHelper');
var config = require('../config/config.json');
var env = process.env.NODE_ENV || "development";

var resolveUserId = function(req, res, next) {
	//TODO move code from app.js here
	next();
};

var resolveMessage = wechat(config[env].wechat.token, function(req, res, next){
  var message = req.weixin;
  console.log(message);
  if((message.MsgType === 'event') && (message.Event === 'subscribe'))
  {
    var replyStr = "感谢你的关注！" + "\n"+ "感谢你的关注！" + "\n" + "感谢你的关注！" + "\n"+ "重要的事情说三遍！";
    res.reply(replyStr);
  }
  console.log(message.FromUserName);
});

router.use('/', resolveUserId, resolveMessage);

module.exports = router;