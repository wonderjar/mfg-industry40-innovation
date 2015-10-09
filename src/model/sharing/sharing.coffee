
wx.config({
  debug: false,
  appId: appId,
  timestamp: timestamp,
  nonceStr: nonceStr,
  signature: signature,
  jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
})

wx.ready () ->
  type = localStorage['type']
  color = localStorage['color']
  alert type
  alert color
  wx.onMenuShareAppMessage({
    title: 'I BOUGHT A NEW CAR!',
    desc: 'Test Desc',
    link: 'http://wonderjar.tunnel.mobi/sharing?type=' + type + '&color=' + color,
    imgUrl: 'http://wonderjar.tunnel.mobi' + imgsrc,
    type: 'link',
    dataUrl: '',
    success: () ->
      console.log('succ')
    cancel: () ->
      console.log('cancel')
  })

  wx.onMenuShareTimeline({
    title: 'I BOUGHT A NEW CAR!',
    link: 'http://wonderjar.tunnel.mobi/sharing?type=' + type + '&color=' + color,
    imgUrl: 'http://wonderjar.tunnel.mobi' + imgsrc,
    success: () ->
      console.log('succ')
    cancel: () ->
      console.log('cancel')
  })