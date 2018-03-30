function Wall(a,b){
  this.a = createVector(min(a.x, b.x) , min(a.y, b.y));
  this.b = createVector(max(a.x, b.x) , max(a.y, b.y));

  this.isIn = function(c){
    return ( c.x > this.a.x && c.x < this.b.x
    && c.y > this.a.y && c.y < this.b.y );
  }

  this.show = function(){
    push();
    translate(this.a.x, this.a.y);
    fill(255,0,255);
    rect(0, 0, this.b.x - this.a.x , this.b.y - this.a.y );
    pop();
  }
}
