var i18n = require('i18n');
var sharingHandler = require('../wechat/sharing.js');
var env = process.env.NODE_ENV || "development";
var config = require('../config/config.json');

exports.new = function(req, res, next) {
  res.render('order/order_new', {});
};

exports.show = function(req, res, next) {
  res.render('order/order_show', {});
};

exports.select = function(req, res, next) {
  console.log('session.userID:' + req.session.userID);

  var typeIndex = req.query.type ? req.query.type : -1;
  var colorIndex = req.query.color ? req.query.color : -1;

  res.render('order/order', {
    order_js_src: i18n.__('order_js_src'),
    typeIndex: typeIndex,
    colorIndex: colorIndex
  });
};

exports.state = function(req, res, next) {
  var timestamp = sharingHandler.createTimestamp();
  var nonceStr = sharingHandler.createNonceStr();
  var url = req.protocol + '://' + req.hostname + req.url; //获取当前url
  console.log("url: "+ url);
  console.log('session.userID:' + req.session.userID);
  sharingHandler.sign(timestamp, nonceStr, url)
      .then(function(signature) {
        res.render('state/state', {appId: config[env].wechat.appID, timestamp: timestamp, nonceStr: nonceStr, signature: signature});
      })
};


exports.sharing = function(req, res, next) {
  var typeArr = ['audi', 'bmw', 'porsche', 'ford', 'chevrolet'];
  var colorArr = ['white', 'orange', 'yellow', 'black', 'red', 'golden', 'silver'];
  var typeIndex = req.query.type;
  var type = typeArr[typeIndex];
  var colorIndex = req.query.color;
  var color = colorArr[colorIndex];
  var intro1 = 'It is ' + type + ' (' + color + ').';
  var imgSrc = 'lib/car/' + type + '_' + color + '.jpg';
  res.render('sharing/sharing', {
    typeIndex: typeIndex,
    colorIndex: colorIndex, 
    intro1: intro1,
    imgSrc: imgSrc
  });
};
exports.anlayse = function(req, res, next) {
  res.render('analyse/display', {display_js_src: i18n.__('display_js_src')});
};