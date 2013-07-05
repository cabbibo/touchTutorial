
var frame, oFrame;

function leapLoop(data){

  frame = data;
  if(!oFrame) oFrame = data;

  if(frame.pointables[0] && oFrame.pointables[0]){
    
    var p = frame.pointables[0];
    var oP = oFrame.pointables[0];
    var pos = leapToScene(p.stabilizedTipPosition);

    if( pos.x >= two.width ){
      pos.x = two.width;
    }else if( pos.x <= 0 ){
      pos.x = 0;
    }

    if( pos.y >= two.height ){
      pos.y = two.height;
    }else if( pos.y <= 0 ){
      pos.y = 0;
    }

    pointer.oTranslation.x = pointer.translation.x; 
    pointer.oTranslation.y = pointer.translation.y; 

    pointer.translation.x = pos.x;
    pointer.translation.y = pos.y;

    pointer.circle.scale = p.touchDistance * 3;

    var pV = p.tipVelocity;
    pointer.velocity.sub(pointer.translation,pointer.oTranslation);
    //pointer.velocity = new Two.Vector(pV[0],pV[1]);
    if( pointer.emitOnMove == true ){
      pointer.emitParticles();
    }

    // ' Mouse Down ' function
    if( p.touchZone == "touching" && oP.touchZone == "hovering" ){
      

      //pointer.color = pointer.touchColor;
      //pointer.constantlyEmit = true;

      if( pointer.insideOf ){
        pointer.insideOf.square.fill = pointer.insideOf.color;
        pointer.insideOf = undefined;
        pointer.color = pointer.hoverColor;
        pointer.circle.stroke = pointer.color;

      }else{
        pointer.checkInside( pointer.translation.x , pointer.translation.y );
        
        if(pointer.insideOf){
           pointer.insideOf.square.fill = pointer.touchColor;

        }

        pointer.color = pointer.touchColor;
        pointer.circle.stroke = pointer.color;


      }
    }
    
    // ' Mouse Up ' function
    if ( oP.touchZone == "touching" && p.touchZone == "hovering" ){

      if( !pointer.insideOf ){
        pointer.color = pointer.hoverColor;
        pointer.circle.stroke = pointer.color;

        pointer.constantlyEmit = false;
      }
    }

  }  

  oFrame = frame;

}
