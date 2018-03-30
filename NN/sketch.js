var ann;

var canvasSizeX = 600, canvasSizeY = 600;

function setup() {
  let canvas = createCanvas(canvasSizeY, canvasSizeY);
  canvas.parent('sketch-holder');
  //p = new Perceptron(3);
  background(120);

  ann = new Ann(2, [7, 5, 7, 8, 2], 1);
  console.log(ann.feedforward([0.5, 0.2]));

  strokeWeight(3);

  ann.train( 100,
    function(){
      var x = random() * 2 - 1;
      var y = random() * 2 - 1;
      var pointPos = [x,y];
      return pointPos;
    },
    function(input, output) {
      var expected;
      if ( input[0] > 0 && input[1] > 0 ){
        expected = 1;
      } else {
        expected = -1;
      }
      console.log( "[x:" + input[0] + ",y:" + input[1] + ", output:" + output[0] + ",expected:" + expected + "]")
      return [output[0] - expected];
    })
}


function draw(){
  /*for ( var i = 0 ; i < 10; i ++){
    var px = random() * canvasSizeX;
    var py = random() * canvasSizeX;
    var x = px / canvasSizeX * 2 - 1;
    var y = py / canvasSizeX * 2 - 1;
    var pointPos = [x,y];
    output = ann.feedforward(pointPos);
    if ( output[0] > 0){
      stroke(255,0,0);
    } else {
      stroke(0, 255, 0);
    }
    point(px,py);
  }*/

  var x = mouseX / canvasSizeX * 2 - 1;
  var y = mouseY / canvasSizeX * 2 - 1;
  var pointPos = [x,y];
  output = ann.feedforward(pointPos);
  if ( output[0] > 0){
    stroke(255,0,0);
  } else {
    stroke(0, 255, 0);
  }
  point(mouseX,mouseY);
  ann.draw();


}
