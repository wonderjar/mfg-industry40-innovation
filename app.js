var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var i18n = require('i18n');
var i18nDebug = require('debug')('i18n');

var webRouter = require('./web_router');
var apiRouter = require('./api_router_v1');

var app = express();

var acceptLanguage = ['zh','en'];
//configure i18n
i18n.configure({
	  // setup some locales - other locales default to en silently
	  locales: acceptLanguage,
	 
	  // sets a custom cookie name to parse locale settings from
	  //cookie: 'i18nForMFGIndustry40',
	  
	  //disabled update i18n json files
	  updateFiles: false,
	 
	  // where to store json files - defaults to './locales'
	  directory: __dirname + '/locales'
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(i18n.init);
i18nDebug('i18n init, acceptLanguage including %s',acceptLanguage.toString());
app.use(function(req,res,next){
	var lang = req.acceptsLanguages(acceptLanguage);
	var ip = req.ip;
	i18nDebug("IP: "+ip+' prefered language: ' + lang);
	next();
});
app.use('/', webRouter);
app.use('/api/v1', apiRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
