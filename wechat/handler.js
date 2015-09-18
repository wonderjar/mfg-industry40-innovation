
var express = require('express');
var router = express.Router();
var wechat = require('wechat');

router.use('/', wechat('wechat_token',function(req, res, next){
  var message = req.weixin;
  console.log(message);
  if((message.MsgType == 'event') && (message.Event == 'subscribe'))
  {
    var replyStr = "感谢你的关注！" + "\n"+ "感谢你的关注！" + "\n" + "感谢你的关注！" + "\n"+ "重要的事情说三遍！";
    res.reply(replyStr);
  }
  console.log(message.FromUserName);
}));

module.exports = router;