function PARTICLE( pointer , index, size , translation, velocity , decayRate ){

  this.pointer = pointer;
  this.index = index;
  this.size = size;
  this.translation = new Two.Vector( translation.x , translation.y );
  this.oTranslation = new Two.Vector().copy(this.translation);
  this.velocity = velocity;
  this.decayRate = decayRate;
  this.circle = two.makeCircle( this.translation.x , this.translation.y , 1);
  this.circle.fill = this.pointer.color;
  this.circle.linewidth = .1;
  this.friction = .98;

}


PARTICLE.prototype = {

  update: function(){

    this.oTranslation.copy(this.translation);
    this.translation.x += this.velocity.x;
    this.translation.y += this.velocity.y;


    for(var i = 0 ; i < containers.length; i ++){
    
      if( containers[i] == this.pointer.insideOf ){
        this.checkInside(containers[i]);
        break;
      }else{
        this.checkOutside(containers[i]);
      }

    }

    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;


    this.size -= this.decayRate;

    if( this.size < 0 ){
      two.remove(this.circle);
      this.pointer.particles[this.index] = undefined;
    }
    this.circle.scale = this.size;
    this.circle.translation.set(this.translation.x,this.translation.y);

  },

  checkInside:function( container ){

    var center = container.scene.translation;
    var border = {};
    border.t = center.y + container.height/2;
    border.b = center.y - container.height/2;
    border.r = container.scene.translation.x + container.width/2;
    border.l = container.scene.translation.x - container.width/2;


    var insideR = this.translation.x < border.r;
    var insideL = this.translation.x > border.l;
    var insideT = this.translation.y < border.t;
    var insideB = this.translation.y > border.b;

    var oInsideR = this.oTranslation.x < border.r;
    var oInsideL = this.oTranslation.x > border.l;
    var oInsideT = this.oTranslation.y < border.t;
    var oInsideB = this.oTranslation.y > border.b;
    
    if( !insideR && oInsideR ){
      this.velocity.x = -this.velocity.x;
    } else if( !insideL && oInsideL ){
      this.velocity.x = -this.velocity.x;
    } 
      
    if(!insideT && oInsideT){
      this.velocity.y = -this.velocity.y;
    } else if( !insideB && oInsideB ){
      this.velocity.y = -this.velocity.y;
    } 



  },

  checkOutside:function( container ){

    var center = container.scene.translation;
    var border = {};
    border.t = center.y + container.height/2;
    border.b = center.y - container.height/2;
    border.r = container.scene.translation.x + container.width/2;
    border.l = container.scene.translation.x - container.width/2;


    var insideR = this.translation.x < border.r;
    var insideL = this.translation.x > border.l;
    var insideT = this.translation.y < border.t;
    var insideB = this.translation.y > border.b;
    var inside = insideR && insideL && insideT && insideB;

    var oInsideR = this.oTranslation.x < border.r;
    var oInsideL = this.oTranslation.x > border.l;
    var oInsideT = this.oTranslation.y < border.t;
    var oInsideB = this.oTranslation.y > border.b;
    var oInside = oInsideR && oInsideL && oInsideT && oInsideB;

    if( inside && !oInside ){
      
      if( this.translation.x > center.x){
        this.velocity.x = -this.velocity.x;
      } else if( this.translation.x < center.x ){
        this.velocity.x = -this.velocity.x;
      } 
      
      if( this.translation.x > center.y ){
        this.velocity.y = -this.velocity.y;
      } else if(this.translation.x < center.y ){
        this.velocity.y = -this.velocity.y;
      } 
    }

  }


}
