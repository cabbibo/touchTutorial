function getDistanceFromPointables( object ){

  var dif = { x:0 , y:0 }

  for (var i = 0; i < frame.pointables.length; i++) {

    var pos = leapToScene(frame.pointables[i].tipPosition);

    dif.x += object.translation.x - pos.x;
    dif.y += object.translation.y - pos.y;

  }

  return dif

}


function leapToScene( obj ){

  newPos = {
    x: two.width/2 + (obj[0]/100)*two.width,
    y: two.height/2 - ((obj[1]-200)/100)*two.height, 
    z: obj[2]
  }

  return newPos

}


