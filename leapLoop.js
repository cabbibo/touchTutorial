
var frame, oFrame;

function leapLoop(data){

  frame = data;
  if(!oFrame) oFrame = data;

  if(frame.pointables[0]){
    
    var pos = leapToScene(frame.pointables[0].tipPosition);
    pointer.translation.x = pos.x;
    pointer.translation.y = pos.y;

    pointer.emitParticles();
    pointer.update();

  }  

  oFrame = frame;

}
