var express = require('express');
var wechat = require('wechat');
var urlHelper = require('./urlHelper');
var config = require('../config/config.json');
var env = process.env.NODE_ENV || "development";
var https = require('https');

var userService = require('../service/user');

exports.resolveWechatUserId = function(req, res, next) {
	//TODO move code from app.js here
  var authCode = req.query.code;
  var jsonData;

  if(req.session && req.session.userID) {
    next();
  }

  if(authCode) {
    console.log('code:' + authCode);
    //https request to get access_token&openid
    var getAccessTokenUrl = urlHelper.getAccessTokenUrl(authCode);
    var accesstokenReq = https.get(getAccessTokenUrl, function(res) {
      console.log(getAccessTokenUrl);
      res.on('data', function(chunk) {
        jsonData = JSON.parse(chunk);
        console.log('access_token:'+jsonData.access_token);
        console.log('openid:'+jsonData.openid);
        var accessToken = jsonData.access_token;
        var openID = jsonData.openid;

        //https request to get user_info
        var  getUserInfoUrl = urlHelper.getUserInfoUrl(accessToken, openID);
        var infoReq = https.get(getUserInfoUrl,function(res){
          res.on('data', function(chunk){
            var userData = JSON.parse(chunk);
            console.log('headimgurl:'+userData.headimgurl);
            //TODO save the userInfo and get the userID
            userService.findByOpenId(openID)
              .then(function(findRes) {
                console.log('result');
                console.log(findRes);
                if(findRes) {
                  // req.query.userID = findRes._id;
                  req.session.userID = findRes._id;
                  next();
                }
                else {
                  userService.create(userData)
                    .then(function(createRes) {
                      console.log('createRes');
                      console.log(createRes);
                      // req.query.userID = createRes._id;
                      req.session.userID = createRes._id;
                      next();
                    });            
                }
              })
          });
        });
      });
      res.on('end',function(){
        console.log('no more data');
      });
    });
  }
  else {
    next();
  }
};

exports.resolveWechatMessage = wechat(config[env].wechat.token, function(req, res, next){
  var message = req.weixin;
  console.log(message);
  if((message.MsgType === 'event') && (message.Event === 'subscribe'))
  {
    var replyStr = "感谢你的关注！" + "\n"+ "感谢你的关注！" + "\n" + "感谢你的关注！" + "\n"+ "重要的事情说三遍！";
    res.reply(replyStr);
  }
  console.log(message.FromUserName);
});

