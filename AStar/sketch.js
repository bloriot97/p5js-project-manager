var tileSize = 7;
var tileSpace = 2;
var spaceProportion = 0.3;
var map;
var mapSize = 60;
var mapCanvaSize = 580;


var laziness = 5;

var colorRange = 100;
var layers = 30;

var gui;

function setup() {
    var canvas = createCanvas(800,600);
    canvas.parent('sketch-holder');

    map = new Map(mapSize);
    tileSize = (1-spaceProportion) * mapCanvaSize / mapSize;
    tileSpace = spaceProportion * mapCanvaSize / mapSize;

    gui = new Gui("Param", 180);

    gui.addElement(new GuiSlider(gui, "Space", 0,1,0.2), function(param){
        spaceProportion = param.value;
        tileSize = (1-spaceProportion) * mapCanvaSize / mapSize;
        tileSpace = spaceProportion * mapCanvaSize / mapSize;
    })

    gui.addElement(new GuiSlider(gui, "Laziness", 1, 8,5), function(param){
        laziness = param.value;
    })

    gui.addElement( new GuiButton(gui, "Search", 30), function( param ){
        while ( !map.done()){
            map.pathStep();
        }
    })
    gui.addElement( new GuiButton(gui, "New", 30), function( param ){
        map.init(layers)
    })
    gui.addElement( new GuiButton(gui, "New Flat", 30), function( param ){
        map.init(0)
    })
    gui.addElement( new GuiCheckBox(gui, "Painting", false), function( param ){
        map.painting = param.value;
    })
    gui.addElement(new GuiSlider(gui, "paintingRadius", 1,15,map.paintingRadius), function(param){
        map.paintingRadius = param.value;
    }, function(v){
        console.log(v)
        return int(v);
    })
    gui.addElement( new GuiCheckBox(gui, "Show details", true), function( param ){
        map.showDetails = param.value;
    })
    gui.addElement( new GuiButton(gui, "alert", 30), function( param ){
        alert("test")
    })
}

function draw() {
    background(44, 62, 80);
    map.draw(210,10);
    /*while ( map.openNodes.heap.length > 0){
        map.pathStep();
    }*/
    map.pathStep();
    //ball.show();

    gui.draw(10,10);
}


function Node(x,y,cost, heur, parentNode = null){
    this.x=x;
    this.y=y;
    this.g = cost;
    this.h = heur;
    this.f = this.g + this.h;
    this.parentNode = parentNode;
}


function mousePressed() {
  if ( gui ){
      gui.pressed(mouseX,mouseY);
  }
}
