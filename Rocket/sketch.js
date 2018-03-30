var rockets = [];

var dnaLength = 300;
var genSize = 50;
var targetPos;
var targetSize = 20;
var genOver = false;
var startingPoint ;

var totalGen = 1;
var speed = 10;
var avgClosest = 0;
var avgTime = 0;

var walls = [];

function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent('sketch-holder');
  startingPoint = createVector(200, 350);

  createFirstGen();
  targetPos = createVector(200, 100);

  walls.push( new Wall( createVector(100,200) , createVector(300,250)));
  walls.push( new Wall( createVector(100,100) , createVector(130,200)));
  walls.push( new Wall( createVector(270,100) , createVector(300,200)));

}

function createFirstGen(){
  for ( var i = 0 ; i < genSize ; i ++){
    rockets.push( new Rocket( createVector(startingPoint.x, startingPoint.y)).randomDNA());
  }
}

function mousePressed() {
  if (speed == 1) {
    speed = 10;
  } else {
    speed = 1;
  }
}

function update(){

  background(50);
  over = true;
  for (var i = 0 ; i < rockets.length ; i ++){
    for ( var u = 0; u < speed; u ++ ){
      rockets[i].applyforce();
      rockets[i].update();
    }

    rockets[i].show();
    if ( !rockets[i].dead ){
      over = false;
    }
  }
  if ( over ){
    genOver = true;
  }
  for (var i = 0 ; i < walls.length ; i ++){
    walls[i].show();
  }
  push();
  translate(targetPos.x, targetPos.y);
  fill(255,0,0);
  ellipse(0, 0, targetSize , targetSize);
  pop();
}

function draw() {

  update();
  push(); // INFO
  fill(235);
  noStroke();
  rect(400,0,200,400);
  fill(0);
  text("Gen : " + totalGen , 415, 20);
  text("Speed : " + speed , 415, 40);
  text("avgClosest : " + avgClosest, 415, 60);
  text("avgTime : " + avgTime,  415, 80);

  pop();
  if ( genOver){ // NEXT GEN
    var totalFitness = 0;
    var rep = [];
    var newGen = [];
    avgClosest = 0;
    avgTime = 0;
    for (var i = 0 ; i < rockets.length ; i ++){
      totalFitness += rockets[i].getFitness();
      avgClosest += rockets[i].closest / rockets.length;
      avgTime += rockets[i].closestTime / rockets.length;
    }
    rep.push(rockets[0].getFitness() / totalFitness );
    for (var i = 1 ; i < rockets.length ; i ++){
      rep.push(rockets[i].getFitness() / totalFitness + rep[i-1]);
    }
    for ( var i = 0 ; i < genSize ; i ++){
      var aRand = random();
      var bRand = random();
      var a = rockets[0];
      var b = rockets[0];
      for ( var ia = 0 ; ia < genSize; ia++){
        if ( rep[ia] > aRand){
          a = rockets[ia];
          ia = genSize;
        }
      }
      for ( var ib = 0 ; ib < genSize; ib++){
        if ( rep[ib] > bRand){
          b = rockets[ib];
          ib = genSize;
        }
      }

      var child = new Rocket(createVector(startingPoint.x, startingPoint.y)).sonOf(a,b).mutate(0.005);
      newGen.push( child );
    }
    rockets = newGen;
    totalGen += 1;
    genOver = false;
  }
}
