curOpeId = 1
isMoving = false

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

moveToOperation 3

setTimeout (() -> moveToOperation 2), 6000