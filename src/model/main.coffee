count = 0;

startcount = () ->
  count = count + 4;
  console.log( count + "%" );
  if count < 99
    setTimeout "startcount()",100;
  else
    window.location = "./order/order";

if !localStorage['orderId']
  startcount();
else
  window.location = null;
