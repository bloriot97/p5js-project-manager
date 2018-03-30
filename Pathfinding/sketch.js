let gui;
let shapes;

function setup() {
    let canvas = createCanvas(800,600);
    canvas.parent('sketch-holder');

    shapes = [];

    let shape1 = new Shape();
    shape1.addVertex( createVector(100,100))
    shape1.addVertex( createVector(200,100))
    shape1.addVertex( createVector(200,200))
    shapes.push(shape1);

    gui = new Gui("Param", 180);
    gui.addElement( new GuiButton(gui, "add shape", 30), function( param ){
        
    })
}

function draw() {
    background(51);

    push();
    translate(200, 0);
    shapes.forEach( (e) => {
      e.draw();
    })
    pop();

    gui.draw(10,10);
}


function mousePressed() {
  if ( gui ){
      gui.pressed(mouseX,mouseY);
  }
}
