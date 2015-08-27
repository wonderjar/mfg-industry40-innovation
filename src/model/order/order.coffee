connection = [['/lib/car/audi_white.jpg','/lib/car/bwm_white.jpg',0,'/lib/car/ford_white.jpg',0],[0,0,0,'/lib/car/ford_orange.jpg',0],[0,0,0,0,'/lib/car/chevrolet_yellow.jpg'],['/lib/car/audi_black.jpg',0,'/lib/car/porsche_black.jpg',0,0],['/lib/car/audi_red.jpg','/lib/car/bwm_red.jpg','/lib/car/porsche_red.jpg',0,'/lib/car/chevrolet_red.jpg'],[0,'/lib/car/bwm_gold.jpg',0,0,0],[0,0,'/lib/car/porsche_silvery.jpg','/lib/car/ford_silvery.jpg',0]]
car_name = [['奥迪R8 （白）','宝马335i （白）',0,'福特野马 （白）',0],[0,0,0,'福特野马 （橙）',0],[0,0,0,0,'雪弗兰科迈罗 （黄）'],['奥迪R8 （黑）',0,'保时捷Panamera （黑）',0,0],['奥迪R8 （红）','宝马335i （红）','保时捷Panamera （红）',0,'雪弗兰科迈罗 （红）'],[0,'宝马335i （金）',0,0,0],[0,0,'保时捷Panamera （银）','福特野马 （银）',0]]
car_title = '奥迪R8 （白）'
btn_unselected = 'btn-primary btn-unselected'
btn_selected = 'btn-primary btn-selected'
btn_disabled = 'btn-primary btn-disabled'
lastType = 'type100'
lastColor = 'color100'
car_type = -1
car_color = -1
car_image = "car/audi_white.jpg"
$(document).ready ->
  $('button').click ->
    fun = if this.id.indexOf('type') is -1 then 1 else 0
    num = if fun is 0 then this.id.substring this.id.indexOf('type') + 4,this.id.indexOf('type') + 5 else this.id.substring this.id.indexOf('color') + 5, this.id.indexOf('color') + 6
    selCar this, fun, num
  $('#submit').click ->
    if $('#submit').hasClass('btn-unavailable')
      return
    PostOrder(car_type, car_color)

  selCar = (obj,fun,index) ->
    if ($('#' + obj.id).hasClass 'btn-disabled') or ($('#' + obj.id).hasClass 'color-disabled')
      return
    if fun is 0
      for i in [0..6]
        if $('#color'+i).hasClass 'color-disabled'
          $('#color'+i).toggleClass 'color-disabled'
      if obj.id isnt lastType
        obj.className = obj.className.replace 'btn-unselected','btn-selected'
        if $('#'+lastType)&&$('#'+lastType).hasClass 'btn-selected'
          $('#'+lastType).toggleClass 'btn-selected btn-unselected'
        lastType = obj.id
        for i in [0..6]
          if connection[i][index] is 0
            if $('#color'+i).hasClass 'color-selected'
              $('#color'+i).toggleClass 'color-selected color-disabled'
            else
              $('#color'+i).toggleClass 'color-disabled'
        car_type = index
        if car_color isnt -1
          $('#car-img').attr 'src', connection[car_color][car_type]
          $('#car-name > span').text car_name[car_color][car_type]
          if $('#submit').hasClass 'btn-unavailable'
            $('#submit').toggleClass 'btn-unavailable btn-available'
      else
        if $('#' + obj.id).hasClass 'btn-unselected'
          obj.className = obj.className.replace 'btn-unselected', 'btn-selected'
          for i in [0..6]
            if connection[i][index] is 0
              if $('#color'+i).hasClass 'color-selected'
                $('#color'+i).toggleClass 'color-selected color-disabled'
              else
                $('#color'+i).toggleClass 'color-disabled'
          car_type = index
          if car_color isnt -1
            $('#car-img').attr 'src', [car_color][car_type]
            $('#car-name > span').text car_name[car_color][car_type]
            $('#submit').toggleClass 'btn-unavailable btn-available'
        else
          obj.className = obj.className.replace 'btn-selected', 'btn-unselected'
          $('#submit').toggleClass 'btn-available btn-unavailable'
          car_type = -1
    else
      for i in [0..4]
        if $('#type'+i).hasClass 'btn-disabled'
          $('#type'+i).toggleClass 'btn-disabled btn-unselected'
      if obj.id isnt lastColor
        $('#'+obj.id).toggleClass 'color-selected'
        if $('#'+lastColor)&&$('#'+lastColor).hasClass 'color-selected'
          $('#'+lastColor).toggleClass 'color-selected'
        lastColor = obj.id
        for i in [0..4]
          if connection[index][i] is 0
            if $('#type'+i).hasClass 'btn-selected'
              $('#type'+i).toggleClass 'btn-selected btn-disabled'
            else
              $('#type'+i).toggleClass 'btn-unselected btn-disabled'
        car_color = index;
        if car_type isnt -1
          $('#car-img').attr 'src', connection[car_color][car_type]
          $('#car-name > span').text car_name[car_color][car_type]
          if $('#submit').hasClass 'btn-unavailable'
            $('#submit').toggleClass 'btn-unavailable btn-available'
      else
        if !($('#' + obj.id).hasClass 'color-selected')
          $('#'+obj.id).toggleClass 'color-selected'
          for i in [0..4]
            if connection[index][i] is 0
              if $('#type'+i).hasClass 'btn-selected'
                $('#type'+i).toggleClass 'btn-selected btn-disabled'
              else
                $('#type'+i).toggleClass 'btn-unselected btn-disabled'
          car_color = index
          if car_type isnt -1
            $('#car-img').attr 'src', connection[car_color][car_type]
            $('#car-name > span').text car_name[car_color][car_type]
            $('#submit').toggleClass 'btn-unavailable btn-available'
        else
          $('#'+obj.id).toggleClass 'color-selected'
          $('#submit').toggleClass 'btn-available btn-unavailable'
          car_color = -1
  BaseUrl = 'http://localhost:3000/api/v1/orders'
  PostOrder = (car_type, car_color) ->
    data = {car_type: Number(car_type)+1, car_color: Number(car_color)+1}
    $.ajax({
      url: BaseUrl,
      type: "POST",
      dataType: "json",
      data: data,
      cache: false,
      async: true,
      headers: {
        contentType: "application/json"
      }
      crossDomain: true,
      success: (data) ->
        if data.id
          alert 'post successfully'
          localStorage['orderId'] = data.id
        else
          alert 'post is fail',
      error: (xmlHttpRequest, textStatus, errorThrown) ->
        alert errorThrown
        if (xmlHttpRequest.readyState is 0) or (xmlHttpRequest.status is 0)
          alert 'Request is fail'
    })