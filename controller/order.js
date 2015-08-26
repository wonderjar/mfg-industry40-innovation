var rfc = require('node-rfc');

exports.new = function(req, res, next) {

var abapSystem = {
  user: 'I079992',
  passwd: 'Initial20',
  ashost: 'iwdfvm4062.wdf.sap.corp',
  sysnr: '50',
  client: '800',
};

//var client = new rfc.Client({'user': 'demo', 'passwd': 'welcome', 'ashost': '10.0.0.1', 'sysnr': '00', 'client': '001'});

// create new client
var client = new rfc.Client(abapSystem);

// echo the client NW RFC lib version
console.log('RFC client lib version: ', client.getVersion());

// and connect
client.connect(function(err) {
  if (err) { // check for login/connection errors
    return console.error('could not connect to server', err);
  }
  else {
  	console.log('Connected successfully');
  }

  // invoke remote enabled ABAP function module
  // client.invoke('STFC_CONNECTION',
  //   { REQUTEXT: 'H€llö SAP!' },
  //   function(err, res) {
  //     if (err) { // check for errors (e.g. wrong parameters)
  //       return console.error('Error invoking STFC_CONNECTION:', err);
  //     }

  //     // work with result;  should be something like:
  //     // { ECHOTEXT: 'Hello SAP!',
  //     //   RESPTEXT: 'SAP R/3 Rel. 702   Sysid: E1Q      Date: 20140613   Time: 142530   Logon_Data: 001/DEMO/E',
  //     //   REQUTEXT: 'Hello SAP!' }
  //     console.log('Result STFC_CONNECTION:', res);
  //   });


  // // invoke more complex ABAP function module
  // var importStruct = {
  //   RFCFLOAT: 1.23456789,
  //   RFCCHAR1: 'A',
  //   RFCCHAR2: 'BC',
  //   RFCCHAR4: 'DEFG',

  //   RFCINT1: 1,
  //   RFCINT2: 2,
  //   RFCINT4: 345,

  //   RFCHEX3: 'fgh',

  //   RFCTIME: '121120',
  //   RFCDATE: '20140101',

  //   RFCDATA1: '1DATA1',
  //   RFCDATA2: 'DATA222'
  // };

  // var importTable = [importStruct];

  // client.invoke('STFC_STRUCTURE',
  //   { IMPORTSTRUCT: importStruct, RFCTABLE: importTable },
  //   function(err, res) {
  //     if (err) {
  //       return console.error('Error invoking STFC_STRUCTURE:', err);
  //     }
  //     console.log('Result STFC_STRUCTURE:', res);
  // });

});

  res.render('order/order_new', {});
};

exports.show = function(req, res, next) {
  res.render('order/order_show', {});
}