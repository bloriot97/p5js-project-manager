class Shape{

  constructor(){
    this.closed = false;
    this.vertices = [];
  }


  addVertex(v) {
    this.vertices.push(v);
  }


  draw(){
    push();
    if ( this.vertices.length > 0){
      if ( this.closed ){
        fill(255);
      } else {
        noFill();
      }

      beginShape();
      this.vertices.forEach( (e) => {
        vertex(e.x, e.y);
      });
      if ( this.closed ){
        endShape(CLOSE);
      } else {
        endShape();
      }
    }
    pop();
  }

}
