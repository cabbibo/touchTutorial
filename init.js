

function init(){

  var elem = document.getElementById('two');
  var params = {types:Two.Types.webgl, width: window.innerWidth, height: innerHeight };
  two = new Two(params).appendTo(elem);

  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.bottom = '0px';
  stats.domElement.style.right = '0px';
  elem.appendChild( stats.domElement );

  clock = new THREE.Clock();


  controller = new Leap.Controller({enableGestures:true});
  controller.on('frame', leapLoop);

  background = two.makeGroup();
  midground = two.makeGroup();
  foreground = two.makeGroup();
  
  
  pointer = new EMITTER({});

  containers= [];
  for( var i = 0; i < 4; i++){
    var container = new CONTAINER({});
    containers.push(container);
  }

  /*$('body').mousemove(function(event){
    pointer.oTranslation.x = pointer.translation.x; 
    pointer.oTranslation.y = pointer.translation.y; 
    pointer.translation.x = event.pageX;
    pointer.translation.y = event.pageY;

    pointer.velocity.sub(pointer.translation,pointer.oTranslation);
    if( pointer.emitOnMove == true ){
      pointer.emitParticles();
    }
  });*/
  /*$('body').mouseup(function(event){
    pointer.color = pointer.hoverColor;
    pointer.insideOf = undefined;
    pointer.constantlyEmit = false;
  });

  $('body').mousedown(function(event){
    
    pointer.color = pointer.touchColor;
    pointer.constantlyEmit = true;

    pointer.checkInside( event.pageX , event.pageY);


  });*/




  // Bind a function to scale and rotate the group
  // to the animation loop.
  two.bind('update', function(frameCount) {

    pointer.update();
    stats.update();

  })  // Finally, start the animation loop
  
  controller.connect();
  two.play();

}
