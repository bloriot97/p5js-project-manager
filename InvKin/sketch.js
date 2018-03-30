var snake, ball;
var target;
var g;

function setup() {
    let canvas = createCanvas(600,400);
    canvas.parent('sketch-holder');

    target = createVector(100, 100);
    snake = new Snake(20,10, 10, 1, true, target);
    ball = new Ball(150 + random() * 300 ,100);

    g = createVector(0,0.1);
    snake.update(ball.position);
}

function draw() {
    background(51);
    target.x = mouseX;
    target.y = mouseY;
    ball.update();
    snake.update(target);
    ball.dragBack(snake.getEndPoint());
    snake.show();
    //ball.show();

}

function Ball(x,y){
  this.position = createVector(x,y);
  this.speed = createVector(0,0);
  this.a = createVector(0,0);


  this.update = function(){
    this.speed.add(g);
    this.speed.add(this.a);
    this.position.add(this.speed);
  }
  this.dragBack = function(pos){
    var diff = p5.Vector.sub(pos, this.position).mult(1);
    if ( diff.mag() > 2){
      this.speed.add(diff);

    }
  }
  this.show = function(){
    push();  // Start a new drawing state
    strokeWeight(15);
    stroke(255,0,0);
    point(this.position.x, this.position.y);
    pop();
  }
}
function Snake(segLen_, len_, startSize_, endSize_, rooted_){
  this.segLen = segLen_;
  this.len = len_;
  this.startSize = startSize_;
  this.endSize = endSize_;
  this.rooted = rooted_;

  this.seg = new Segment(300, 150, 0, this.segLen, this.endSize);
  this.seg.rooted = this.rooted;
  prev = this.seg;
  for ( var i = 1; i < this.len; i ++){
    var child = new Segment(300, 200, 0, this.segLen, this.endSize + (this.startSize - this.endSize) * (i / this.len));
    prev.child = child;
    prev = child;
    this.segEnd = child;
  }


  this.update = function(target){
    this.seg.update(target);
  }
  this.show = function(){
    this.seg.show();
  }
  this.getEndPoint = function(){
    return this.segEnd.b;
  }
}

function Segment(x,y, angle_, len_, weight_){
  this.a = createVector(x,y);
  this.b = createVector(0,0);
  this.angle = angle_;
  this.len = len_;
  this.child = null;
  this.weight = weight_;
  this.rooted = false;

  this.calculateB = function(){
    this.b.x = this.a.x + cos(this.angle) * this.len;
    this.b.y = this.a.y + sin(this.angle) * this.len;

  }

  this.follow = function(x, y){
    target = createVector(x,y);
    dir = p5.Vector.sub(target, this.a);
    this.angle = dir.heading();

    dir = dir.setMag(this.len);
    dir = dir.mult(-1);
    this.a = p5.Vector.add(target, dir);
    this.calculateB();

  }

  this.dragBack = function(x,y){
    this.a = createVector(x,y);
    target = createVector(this.b.x,this.b.y);
    dir = p5.Vector.sub(target, this.a);
    this.angle = dir.heading();
    this.calculateB();
    if ( this.child != null ){
        this.child.dragBack(this.b.x, this.b.y);
    }
  }

  this.update = function(target){
    if ( this.child != null ){
      this.child.update(target);
      if ( !this.rooted ){
        this.follow(this.child.a.x, this.child.a.y);
      } else {
        tmpX = this.a.x;
        tmpY = this.a.y;
        this.follow(this.child.a.x, this.child.a.y);
        this.dragBack(tmpX, tmpY)
      }
    } else {
      this.follow(target.x, target.y);
    }
    this.calculateB();
  }

  this.show = function(){
    stroke(255);
    strokeWeight(this.weight);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
    if ( this.child != null ){
      this.child.show();
    }
  }
}
