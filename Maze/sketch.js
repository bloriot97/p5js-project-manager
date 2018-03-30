var grid = [];
var sizeX = 41, sizeY = 41;
var rectSize = 10;
var pos = 0;
var getWay = true;

function setup() {
  let canvas = createCanvas(640, 480);
  canvas.parent('sketch-holder');

  genMaze();
  noStroke();
}

function clearMap(){
  grid = [];
  for ( var x = 0; x < sizeX; x += 1){
    var line = [];
    for ( var y = 0; y < sizeY; y += 1){
      line.push('way');
    }
    grid.push(line)
  }
  pos = 0;
}

function genMaze(){
  grid = [];
  var i = 0;
  for ( var x = 0; x < sizeX; x += 1){
    var line = [];
    for ( var y = 0; y < sizeY; y += 1){
      if ( x % 2 == 0 || y % 2  == 0){
        line.push('wall');
      } else {
        line.push(i);
        i += 1;
      }
    }
    grid.push(line)
  }
  var done = false;
  var i = 0;
  while ( !done ){
    var x = int(random(1) * (sizeX - 2)) + 1;
    if ( x % 2 == 0){
      //var y = (int(random(0.5) * (sizeX-1)) * 2) + 1;
      var y = (int(random(1) * (sizeX / 2 - 1 ) )* 2) + 1;
    } else {
      var y = (int(random(1) * (sizeX / 2 - 2)) * 2)  + 2;
      //var y = (int(random(0.5) * (sizeX-1 ) )* 2) + 2;
    }

    if ( grid[x][y] == 'wall' ){
      if ( x % 2 == 1 ){
        var from = grid[x][y - 1];
        var to = grid[x][y + 1];
      } else {
        var from = grid[x - 1][y];
        var to = grid[x + 1][y];
      }
      if ( from != to ){
        var changes = false;
        grid[x][y] = to;
        for ( var px = 0; px < sizeX; px += 1){
          for ( var py = 0; py < sizeY; py += 1){
            if ( grid[px][py] == from ){
              grid[px][py] = to;
              changes = true;
            }
          }
        }
        if ( !changes ){
          done = true;
        }
      }

    }
    i += 1;
    if ( i > 5000){
      done = true;
    }

  }
  pos = 0;
  for ( var px = 0; px < sizeX; px += 1){
    for ( var py = 0; py < sizeY; py += 1){
      if ( grid[px][py] != 'wall' ){
        grid[px][py] = 'way';
      }
    }
  }
  grid[1][1] = '0';
}

function genRandom(){
  grid = [];
  for ( var x = 0; x < sizeX; x += 1){
    var line = [];
    for ( var y = 0; y < sizeY; y += 1){
      if (random() > 0.2){
        line.push('way');

      } else {
        line.push('wall');
      }
    }
    grid.push(line)
  }
  var randX = int(random(1) * sizeX);
  var randY = int(random(1) * sizeY);
  grid[randX][randY] = '0';
  var randX = int(random(1) * sizeX);
  var randY = int(random(1) * sizeY);
  grid[randX][randY] = 'end';

  pos = 0;
}

function fillAroud(pointX,pointY){
  var add = false;
  var x = -1;
  var y = 0;
  if ( pointX + x >= 0 &&
    pointX + x < sizeX &&
    pointY + y >= 0 &&
    pointY + y < sizeY){
    if ( grid[pointX + x][pointY + y] == 'way' ){
      grid[pointX + x][pointY + y] = pos + 1;
      add = true;
    }
  }
  x = 1;
  y = 0;
  if ( pointX + x >= 0 &&
    pointX + x < sizeX &&
    pointY + y >= 0 &&
    pointY + y < sizeY){
    if ( grid[pointX + x][pointY + y] == 'way' ){
      grid[pointX + x][pointY + y] = pos + 1;
      add = true;
    }
  }
  x = 0;
  y = -1;
  if ( pointX + x >= 0 &&
    pointX + x < sizeX &&
    pointY + y >= 0 &&
    pointY + y < sizeY){
    if ( grid[pointX + x][pointY + y] == 'way' ){
      grid[pointX + x][pointY + y] = pos + 1;
      add = true;
    }
  }
  x = 0;
  y = 1;
  if ( pointX + x >= 0 &&
    pointX + x < sizeX &&
    pointY + y >= 0 &&
    pointY + y < sizeY){
    if ( grid[pointX + x][pointY + y] == 'way' ){
      grid[pointX + x][pointY + y] = pos + 1;
      add = true;
    }
  }
  return add;
}

function getTheWay(){
  var add = false;
  for ( var x = 0; x < sizeX; x += 1){
    for ( var y = 0; y < sizeY; y += 1){
      if ( grid[x][y] == pos ){
        if ( fillAroud(x,y) ){
          add = true;
        }
      }
    }
  }
  if ( add ){
    pos += 1;
  } else {
    getWay = false;
  }
}

function drawing(){
  if (mouseIsPressed){
    var x = int(mouseX / rectSize);
    var y = int(mouseY / rectSize);
    if ( x >= 0 && x < sizeX && y >= 0 && y < sizeY){
      grid[int(mouseX / rectSize)][int(mouseY / rectSize)] = 'wall'

    }
  }
}

function draw() {
  background(200,200,200);
  if ( getWay ){
    getTheWay();
  } else {
    drawing();
  }

  for ( var x = 0; x < sizeX; x += 1){
    for ( var y = 0; y < sizeY; y += 1){
      if ( grid[x][y] == 'wall'){
        fill(0);
      } else if ( grid[x][y] == '0'){
        fill(0,255,0);
      } else if ( grid[x][y] == 'end'){
        fill(255,0,0);
      } else if ( grid[x][y] == 'way') {
        fill(255);
      } else {
        fill(0,255,(grid[x][y] / pos * 255));
      }
      rect(x * rectSize, y * rectSize, rectSize, rectSize);
    }
  }
}
