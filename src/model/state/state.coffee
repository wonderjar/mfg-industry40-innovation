curOpeId = 1
curStatusId = 1
topStart = 35
statusGap = 50
isMoving = false
order_id = localStorage['orderId']
BaseUrl = 'http://localhost:3000/api/v1/orders'
order_status = -1
$(document).ready ->
	findOrder = (BaseUrl, data) ->
		$.ajax({
			url: BaseUrl + '/' + order_id,
			type: "GET",
			dataType: "json",
			cache: false,
			async: true,
			crossDomain: true,
			success: (data) ->
				if data.id
					order_status = data.status
					alert 'post successfully'
				else
					alert 'post is fail',
			error: (xmlHttpRequest, textStatus, errorThrown) ->
				alert errorThrown
				if (xmlHttpRequest.readyState is 0) or (xmlHttpRequest.status is 0)
					alert 'Request is fail'
		})

  setInterval (() -> findOrder BaseUrl, order_id), 2000



moveToStatus = (statusId) ->
  curTop = topStart + (curStatusId - 1) * statusGap
  desTop = topStart + (statusId - 1) * statusGap
  if(statusId >= 2)
    desTop += 280
  speedPerSec = 60
  timeInterval = 20
  isMoving = true
  moveTimer = setInterval (() ->
    curTop += (speedPerSec / 1000) * timeInterval
    $('.car').css('top', curTop + 'px');
    console.log curTop
    console.log desTop

    if(curTop >= desTop)
      curStatusId = statusId
      isMoving = false
      clearInterval moveTimer
      if(3 is curStatusId)
        $('.car').css('animation', 'spin-a 1s linear');
        setTimeout (() ->
          $('.car').css('transform', 'rotate(-90deg)')
        ), 950
  ), timeInterval


moveToOperation = (opeId) ->
	offsetPerc = 100 * (opeId - 1)
	speedPerSec = 50 * if opeId - curOpeId > 0 then 1 else -1
	curOffsetPerc = (curOpeId - 1) * 100
	timeInterval = 20
	isMoving = true
	moveTimer = setInterval (() ->
		curOffsetPerc += (speedPerSec / 1000) * timeInterval
		$('.slides').css('right', curOffsetPerc + '%')
		if(speedPerSec > 0 && curOffsetPerc >= offsetPerc || speedPerSec < 0 && curOffsetPerc <= offsetPerc)
			curOpeId = opeId
			isMoving = false
			clearInterval moveTimer
      if(2 is curOpeId)
        $('.car').css('animation', 'spin 1s linear');
        setTimeout (() ->
          $('.car').css('transform', 'rotate(0deg)')
        ), 950
		), timeInterval

moveToStatus 3

#moveToOperation 3

setTimeout (() -> moveToOperation 2), 10000

