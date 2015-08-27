curOpeId = 1
curStatusId = 1
topStart = 35
statusGap = 50
isMoving = false

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