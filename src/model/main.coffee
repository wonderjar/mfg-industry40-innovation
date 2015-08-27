if !localStorage['orderId']
  setTimeout (() -> window.location = './order/order'), 2500
else
  window.location = './order/state'

$('.welcome_button').click ->
  window.location = './order/order'