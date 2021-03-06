function CONTAINER( params ){

  this.scene = two.makeGroup();


  if( params.width ){
    this.width = params.width;
  }else{
    this.width = 200;
  }

  if( params.height ){
    this.height = params.height;
  }else{
    this.height = 200;
  }


  if( params.x ){
    this.scene.translation.x = params.x;
  }else{
    this.scene.translation.x = Math.random() * window.innerWidth;
  }

  if( params.y ){
    this.scene.translation.y = params.y;
  }else{
    this.scene.translation.y = Math.random() * window.innerHeight;
  }

  if( params.color ){
    this.color = params.color;
  }else{
    this.color = "#4791c1";
  }

  this.square = two.makeRectangle( 0 , 0 , this.width , this.height );

  this.square.fill = this.color;

  this.scene.add(this.square);
  background.add(this.scene);

}


CONTAINER.prototype = {

  update:function(){


  }


}
