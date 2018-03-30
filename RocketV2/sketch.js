var rockets = [];

var dnaLength = 20;
var genSize = 50;
var targetPos;
var targetSize = 20;
var genOver = false;
var startingPoint ;

var totalGen = 1;
var time = 0;
var speed = 1;
var avgClosest = 0;
var avgTime = 0;
var avgFitness = 0;
var avgFitnessArray = [];
var maxFitness = 0;

var walls = [];
var stars = [];
var puls = 2;

// GUI
var paused = false;

var planetImg;
var rocketImg;

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent('sketch-holder');
  startingPoint = createVector(200, 350);

  createFirstGen();
  targetPos = createVector(200, 100);

  planetImg = loadImage(getResourcePath("./planet.png"));
  rocketImg = loadImage(getResourcePath("./rocket.png"));


  noiseDetail(1,1);

  genWall();

  for ( var i = 0 ; i < 100; i ++){
    stars.push( {x: random() * 400, y: random() * 400, size: random()*2 + 2});
  }
}


function genWall(){
  walls = [];
  walls.push( new Wall( "bloc", {a: createVector(0,180) ,b: createVector(150,220)} ));

  walls.push( new Wall( "bloc", {a: createVector(-100,0) ,b: createVector(0, 400)} ));
  walls.push( new Wall( "bloc", {a: createVector(400,0) ,b: createVector(500, 400)} ));
  walls.push( new Wall( "bloc", {a: createVector(0,-100) ,b: createVector(400, 0)} ));
  walls.push( new Wall( "bloc", {a: createVector(0,400) ,b: createVector(400, 510)} ));

  for ( var i = 0 ; i < 5; i ++){
    walls.push( new Wall( "planet", {bounds: createVector(400,400), r: 10 + random() * 3} ));
  }
}

function createFirstGen(){
  for ( var i = 0 ; i < genSize ; i ++){
    rockets.push( new Rocket( createVector(startingPoint.x, startingPoint.y)).randomDNA());
  }
}

function mousePressed() {

}

function keyPressed() {
  if (key == 'P') {
    paused = !paused ;
  }
  if ( paused ){
    if (key == 'N') {
      paused = false;
      update(1000000);
      paused = true;
    }
  }
}

function update(nU){


  for ( var u = 0; u < nU; u ++ ){
    over = true;
    for (var i = 0 ; i < rockets.length ; i ++){
      rockets[i].applyforce();
      rockets[i].update();

      if ( !rockets[i].dead ){
        over = false;
      }
    }
    time += 1;
    for (var i = 0 ; i < walls.length ; i ++){
      walls[i].update(time);
    }
    if ( over ){
      genOver = true;
      u = nU;
    }
    if ( paused ){
      u = nU;
    }
  }


}

function draw() {
  background(19, 0, 46);
  drawStars();
  if ( !paused ){
    update(speed);
  }
  drawEnvironement();
  drawGUI();
  if ( paused ){
    for (var i = 0 ; i < rockets.length ; i ++){
      var d = dist(mouseX, mouseY , rockets[i].position.x, rockets[i].position.y);
      if ( d < 10 ){
        rockets[i].showInfo();
      }
    }
  }
  if ( genOver){ // NEXT GEN
    genNewGen();
    if ( totalGen % 5 == 0){
      //genWall();
    }
  }
}

function drawStars(){
  push();
  fill(255);
  noStroke();
  for ( var i = 0 ; i < stars.length; i ++){
    ellipse(stars[i].x, stars[i].y, stars[i].size, stars[i].size);
  }
  pop();
}

function drawEnvironement(){
  for (var i = 0 ; i < rockets.length ; i ++){
    rockets[i].show();
  }
  for (var i = 0 ; i < walls.length ; i ++){
    walls[i].show();
  }
}

function drawGUI() {
  push(); // INFO
  fill(235);
  noStroke();
  rect(400,0,200,400);
  rect(000,400,600,600);
  if ( avgFitnessArray.length >= 2){
    fill(255);
    rect(50,450,200,100);
    stroke(255,0,0);
    var space = 200 / (avgFitnessArray.length - 1);
    for (var i = 0 ; i < avgFitnessArray.length - 1; i ++){
      line(50 + i* space, 550 - avgFitnessArray[i] / maxFitness * 100, 50 + (i+1)* space, 550 - avgFitnessArray[i+1] / maxFitness * 100 )
    }
    noStroke();

  }



  fill(0);
  text("Gen : " + totalGen , 415, 20);
  text("Speed : " + speed , 415, 40);
  text("avgClosest : " + avgClosest, 415, 60);
  text("avgTime : " + avgTime,  415, 80);
  text("avgFitness : " + avgFitness,  415, 100);

  pop();
}

function genNewGen(){
  var totalFitness = 0;
  var rep = [];
  var newGen = [];
  avgClosest = 0;
  avgTime = 0;
  avgFitness = 0;
  for (var i = 0 ; i < rockets.length ; i ++){
    totalFitness += rockets[i].getFitness();
    avgClosest += rockets[i].closest / rockets.length;
    avgTime += rockets[i].closestTime / rockets.length;
  }
  avgFitness = totalFitness / rockets.length;
  avgFitnessArray.push(avgFitness);
  maxFitness = max(avgFitness, maxFitness);
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

    var child = new Rocket(createVector(startingPoint.x, startingPoint.y)).sonOf(a,b).mutate(0.02);
    newGen.push( child );
  }
  rockets = newGen;
  totalGen += 1;
  genOver = false;
  if ( totalGen % 5 == 0){
    genWall();
  }
}
