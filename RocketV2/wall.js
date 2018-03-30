var wallCol = [
  {r: 39,g: 174,b: 96},
  {r: 41,g: 128,b: 185},
  {r: 142,g: 68,b: 173},
  {r: 22,g: 160,b: 133},
  {r: 211,g: 84,b: 0},
  {r: 231,g: 76,b: 60},
  {r:192,g: 57,b: 43}
]


function Wall(type , param){
  this.updatePlanet = function(time){
    this.c = createVector( (noise(time * this.timeFactor, this.rand * 100) - 0.1 ) * 1.2 * this.bounds.x ,
     (noise(this.rand2 * 100, time * this.timeFactor) - 0.1 ) * 1.2 * this.bounds.y);
  }

  this.type = type;
  this.color = wallCol[int(random() * wallCol.length)];
  this.rand = random();
  this.rand2 = random();
  if ( type == "bloc"){
    this.a = createVector(min(param.a.x, param.b.x) , min(param.a.y, param.b.y));
    this.b = createVector(max(param.a.x, param.b.x) , max(param.a.y, param.b.y));
  }
  if ( type == "circle"){
    this.c = createVector(param.c.x , param.c.y);
    this.r = param.r;
  }
  if ( type == "planet"){
    this.bounds = createVector(param.bounds.x , param.bounds.y);
    this.r = param.r;
    this.updatePlanet(0);
    this.timeFactor = 0.0015;

  }



  this.isIn = function(c){
    if ( this.type == "bloc"){
      return ( c.x > this.a.x && c.x < this.b.x
      && c.y > this.a.y && c.y < this.b.y );
    } else if ( this.type == "circle" || this.type == "planet"){
      var d = dist(this.c.x, this.c.y, c.x, c.y);
      return ( d < this.r);
    }

  }

  this.update = function( time ){
    if ( this.type == "planet"){
      this.updatePlanet(time);
    }
  }

  this.show = function(){
    if ( this.type == "bloc"){
      push();
      translate(this.a.x, this.a.y);
      fill(255,0,255);
      rect(0, 0, this.b.x - this.a.x , this.b.y - this.a.y );
      pop();
    } else if ( this.type == "circle" || this.type == "planet" ){
      push();
      noStroke();
      translate(this.c.x, this.c.y);
      fill(this.color.r, this.color.g, this.color.b);
      ellipse(0, 0, this.r * 2, this.r * 2 );
      tint(this.color.r, this.color.g, this.color.b);
      rotate(millis() / 1000 * (this.rand/2 +0.5 ))
      image(planetImg, -this.r, -this.r,this.r * 2, this.r * 2 );
      pop();
    }



  }
}
