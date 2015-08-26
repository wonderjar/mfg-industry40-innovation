if !localStorage['orderId']
  setTimeout (() -> window.location = "./order/order"), 2500
else
  window.location = null;
