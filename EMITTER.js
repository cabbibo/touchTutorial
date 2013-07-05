function EMITTER( params ){

  this.background = two.makeGroup();
  this.foreground = two.makeGroup();

  this.params = params;

  if( params.size ){
    this.size = params.size;
  } else {
    this.size = 10;
  }

  if( params.touchColor ){
    this.touchColor = params.touchColor;
  }else{
    this.touchColor = "#38e8ae";
  }
  
  if( params.hoverColor ){
    this.hoverColor = params.hoverColor;
  }else{
    this.hoverColor = "#ff4848";
  }

  if( params.maxParticleTime ){
    this.maxParticleTime = params.maxParticleTime;
  }else{
    this.maxParticleTime = .01;
  }

  if( params.particleStartSize ){
    this.particleStartSize = params.particleStartSize;
  }else{
    this.particleStartSize = this.size;
  }

  if( params.particleDecayRate ){
    this.particleDecayRate = params.particleDecayRate;  
  }else{
    this.particleDecayRate = .1;
  }

  if(params.maxParticles){
    this.maxParticles = params.maxParticles;
  }else{
    this.maxParticles = this.particleStartSize / this.particleDecayRate;
  }

  if( params.constantlyEmit ){
    this.constantlyEmit = params.constantlyEmit;
  }else{
    this.constantlyEmit = false; 
  }

  if( params.emitOnMove ){
    this.emitOnMove = params.emitOnMove;
  }else{
    this.emitOnMove = true; 
  }


  this.color = this.hoverColor;
  /*
  Start making the actual emitter
  */

  this.translation = new Two.Vector( 100 , 100 );
  this.oTranslation = new Two.Vector( 100 , 100 );
  this.velocity = new Two.Vector( 0 , 0 ); 

  this.centerCircle = two.makeCircle( 0 , 0 , this.size );
  this.centerCircle.color = this.color;
  this.foreground.add( this.centerCircle );

  this.particles = [];
  this.particleIndex = 0;
  this.timeSinceLastParticle = 0;
 
}


EMITTER.prototype = {
 
  createNewParticle:function (){


    var i = this.particleIndex;                                     // index
    var s = this.particleStartSize;                                 // size
    var t = this.translation;                                       // translation
    var v = new Two.Vector().copy(this.velocity) ; 
    v.x += (Math.random()-.5) * this.velocity.x * 2;
    v.y += (Math.random()-.5) * this.velocity.y * 2; 
    var dR = this.particleDecayRate;                                // decayRate

    this.particles[this.particleIndex] = new PARTICLE( this , i , s , t , v , dR);

  },

  // This will emit particles in random directions
  emitParticles:function(){

    if( this.timeSinceLastParticle <= this.maxParticleTime ){
    
      this.timeSinceLastParticle += clock.getDelta();
      
    }else{

      if( !this.particles[this.particleIndex] ) {

        this.createNewParticle();
        this.particleIndex += 1;  
      
        if( this.particleIndex >= this.maxParticles ){
          this.particleIndex = 0;
        }

      }else{

        two.remove(this.particles[this.particleIndex].circle);
     
        this.createNewParticle();
        
        this.particleIndex += 1;
        
        if( this.particleIndex >= this.maxParticles ){
          this.particleIndex = 0;
        }

      }
      
      this.timeSinceLastParticle = 0;
    }

  },

  checkInside:function(x,y){

    console.log(x + ' , ' + y );
    for( var i = 0 ; i < containers.length; i ++){

      var center = containers[i].scene.translation;
      var width = containers[i].width;
      var height = containers[i].height;
      var inHor = x < center.x + width/2 && x > center.x - width/2 ;
      var inVert = y < center.y + height/2 && y > center.y - height/2 ;
      if( inVert && inHor ){
        console.log(containers[i]);
        this.insideOf = containers[i];
        background.remove(containers[i].scene);
        foreground.add(containers[i].scene);
      }else{
        background.add(containers[i].scene);
        foreground.remove(containers[i].scene);
      }

    }

  },

  update:function(){

    this.foreground.translation.copy(this.translation);
    this.background.translation.copy(this.translation);

    if( this.insideOf ){
      this.insideOf.scene.translation.copy( this.translation );
    }
    if( pointer.constantlyEmit == true ){
      pointer.emitParticles();
    }

    for( var i = 0; i < this.particles.length; i ++ ){

      if( this.particles[i] ){
        this.particles[i].update();
      }

    }

  }

}



