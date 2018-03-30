
function setup() {
  createCanvas(600, 600);

}
var posX = 300;
var posY = 300;
var prevPosX = 300;
var prevPosY = 300;
var speedX = 0;
var speedY = 0;

var i = 0;
var s = 0;
function draw(){
  //background(55);
  s += createVector(accelerationX, accelerationY).mag();
  i+= 1;
  text( s / i, 20,20);
  strokeWeight(1);
  stroke(255,0,0);
  speedX += accelerationX * 0.1;
  speedY += accelerationY * 0.1;

  posX += speedX;
  posY += speedY;
  line(prevPosX, prevPosY, posX, posY);
  prevPosX = posX;
  prevPosY = posY;



}
