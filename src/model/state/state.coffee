curOpeId = 1
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
			), timeInterval

  setInterval (() -> findOrder BaseUrl, order_id), 2000

	moveToOperation 3

	setTimeout (() -> moveToOperation 2), 6000