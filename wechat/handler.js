var express = require('express');
var wechat = require('wechat');
var urlHelper = require('./urlHelper');
var config = require('../config/config.json');
var env = process.env.NODE_ENV || "development";
var https = require('https');

var userService = require('../service/user');
var usedCodeService = require('../service/usedCode');

exports.resolveWechatUserId = function(req, res, next) {
	//TODO move code from app.js here
  var authCode = req.query.code;
  var jsonData;

  if(req.session && req.session.userID) {
    console.log('hasSession');
    console.log(req.session.userID);
    next();
    return;
  }
  else if(authCode) {
    console.log('code:' + authCode);
    usedCodeService.findByCode(authCode)
      .then(function(findCodeRes) {
        if(findCodeRes) {
          //Code has been used
          res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxeff9b9ada388e3e9&redirect_uri=http%3a%2f%2fwonderjar.ngrok.natapp.cn%2forder%2forder&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect');
        }
        else {

          //Async
          usedCodeService.create(authCode);

          var getAccessTokenUrl = urlHelper.getAccessTokenUrl(authCode);
          var accesstokenReq = https.get(getAccessTokenUrl, function(res) {
            console.log(getAccessTokenUrl);
            res.on('data', function(chunk) {
              jsonData = JSON.parse(chunk);
              console.log('access_token:'+jsonData.access_token);
              console.log('openid:'+jsonData.openid);
              var accessToken = jsonData.access_token;
              var openID = jsonData.openid;

              userService.findByOpenId(openID)
                .then(function(findRes) {
                    if(findRes) {
                      req.session.userID = findRes._id;
                      req.query.headImgUrl = findRes.headimgurl;
                      next();
                    }
                    else {
                      var getUserInfoUrl = urlHelper.getUserInfoUrl(accessToken, openID);
                      var infoReq = https.get(getUserInfoUrl,function(res){
                        res.on('data', function(chunk) {
                          var userData = JSON.parse(chunk);
                          console.log(userData);
                          userService.create(userData)
                            .then(function(createRes) {
                              console.log('createRes');
                              console.log(createRes);
                              req.session.userID = createRes._id;
                              req.query.headImgUrl = createRes.headimgurl;
                              next();
                            });                          
                        });
                      });
                    }                
                });
            });
          });
        }
      });
  }
  else {
    res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxeff9b9ada388e3e9&redirect_uri=http%3a%2f%2fwonderjar.ngrok.natapp.cn%2forder%2forder&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect');
  }
};

exports.resolveWechatMessage = wechat(config[env].wechat.token, function(req, res, next){
  var message = req.weixin;
  console.log('wechatMessage');
  console.log(message);
  if((message.MsgType === 'event') && (message.Event === 'subscribe'))
  {
    var replyStr = "Thanks for following us on Wechat!" + "\n"+ "Purchase your customized car here, and enjoy！";
    res.reply(replyStr);
  }
  else {
    res.reply();
  }
  //console.log(message.FromUserName);
});

