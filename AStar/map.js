
function Map(size){
    this.tiles = [];
    this.visitedTiles = [];
    this.tilesHeight = [];
    this.path = [];

    this.painting = true;
    this.paintingRadius = 10;

    this.size = size;

    this.targetX = size - 1;
    this.targetY = size - 1;


    this.openNodes = new BinaryHeap();
    this.closdNodes = [];

    this.showDetails = true;

    this.init(layers);

}


function magn(x, y, z){
    return Math.sqrt(x*x+z*z+y*y)
}

Map.prototype.done = function(){
  return !(map.openNodes.heap.length > 0);
}

Map.prototype.pathStep = function(){
    var node = this.openNodes.pop();
    var done = false;
    if ( node ){
        for ( var x = -1; x < 2; x ++){
            for ( var y = -1; y < 2; y ++){
                 var d = 0;
                if ( (y!=0 || x!=0)){
                    if ( this.getTile(node.x + x, node.y +y)){
                        //laziness
                        var dh = laziness*max(0,(this.tilesHeight[node.x + x][node.y + y] - this.tilesHeight[node.x][node.y]));
                        var d = magn(x,y, dh);
                        var h = magn(x+node.x - this.targetX, y + node.y - this.targetY, laziness*max(0, this.tilesHeight[node.x + x][node.y + y] - this.tilesHeight[this.targetX][this.targetY]));
                        this.tiles[node.x + x][node.y + y] = false;
                        var newN = new Node(node.x + x, node.y + y, node.g + d, h, node);
                        this.openNodes.push(newN);
                        //console.log(node.g );
                        this.updatePath(newN);
                        if ( h == 0){
                            this.openNodes = new BinaryHeap();
                            done = true;
                        }
                    }
                }
            }
        }
        this.closdNodes.push(node);
    }
}

Map.prototype.updatePath = function(node){
    this.path = [];
    while(node){
        this.path.push(node);
        node = node.parentNode;
    }
}


Map.prototype.getTile = function(x,y){
    if ( x >= 0 && y >= 0 && x < this.size && y < this.size ){
        return this.tiles[x][y];
    } else {
        return false;
    }
}

Map.prototype.init = function(layers){
    this.tiles = [];
    this.visitedTiles = [];
    this.tilesHeight = [];
    this.path = [];


    noiseSeed(int(random(1000000)));

    this.tiles = [];
    for (var x = 0 ; x < this.size; x++ ){
        line = [];
        height = [];
        for (var y = 0 ; y < this.size; y++ ){
            line.push( true/*!Boolean(int(random(1.6)))*/ );
            height.push(int(noise(x/15,y/15)*(layers)));

        }
        this.tiles.push(line);
        this.tilesHeight.push(height);
    }
    this.visitedTiles = this.tiles.slice();

    this.openNodes = new BinaryHeap();
    this.statingNode = new Node(0,0,0,0,null);
    this.openNodes.push(this.statingNode);
    this.closdNodes = [];
    this.tiles[0][0] = false;
}

Map.prototype.drawTile = function(x,y,color, scaleFactor = 1){
    fill(color.r, color.g, color.b);
    rect((tileSize+tileSpace) * x + tileSpace/2 ,(tileSize+tileSpace) * y + tileSpace/2, tileSize * (scaleFactor+0.075), tileSize * (scaleFactor+0.075) )
}

Map.prototype.draw = function(outsetX, outsetY){
    push();
    translate(outsetX, outsetY);
    fill(236, 240, 241);
    noStroke();
    for (var x = 0 ; x < this.size; x++ ){
        for (var y = 0 ; y < this.size; y++ ){
            if ( true ){
                c = toColorScale( this.tilesHeight[x][y]/layers*1.2)
              this.drawTile(x,y,c);
            }
        }
    }
    if ( this.showDetails ){
      var closedNodeColor = {r: 46,g: 204,b: 113}
      for ( var i = 0 ; i < this.closdNodes.length; i ++){
          this.drawTile(this.closdNodes[i].x, this.closdNodes[i].y, closedNodeColor );

      }
      var openNodeColor = {r: 231,g: 76,b: 60};
      for ( var i = 0 ; i < this.openNodes.heap.length; i ++){
          this.drawTile(this.openNodes.heap[i].x, this.openNodes.heap[i].y, openNodeColor );
      }
    }

    var pathColor = {r: 241,g: 196,b: 15};
    for ( var i = 0 ; i < this.path.length; i ++){
        this.drawTile( this.path[i].x, this.path[i].y, pathColor);

    }

    var startColor = {r: 236,g: 240,b: 241};
    this.drawTile( this.statingNode.x, this.statingNode.y, startColor , 0.75);

    if ( this.painting ){
        var coef = 1;
        if ( keyIsDown(17) ){
          coef = -1;
        } else {
          coef = 1;
        }
        if ( mouseIsPressed ){
            var mX = int((mouseX - outsetX) / (tileSize + tileSpace));
            var mY = int((mouseY - outsetY) / (tileSize + tileSpace));
            for ( var iX = -this.paintingRadius; iX < this.paintingRadius; iX ++){
                for ( var iY = -this.paintingRadius; iY < this.paintingRadius; iY ++){
                        if ( this.getTile(mX + iX, mY + iY) ){
                            var d = magn(iX, iY, 0) / this.paintingRadius;
                            if ( d < 1){
                                this.tilesHeight[iX+mX][iY + mY] += coef * cos(PI / 2 * d);
                            }
                        }

                }
            }
        }
    }

    pop();
}

function toColorScale(f){
    return {r: int(52 + 179*f),g: 152 - 76*f,b: 219 - 159*f}
}
