function Neuron(n){
  this.weigths = [];
  this.output = 1;
  for (var i = 0; i < n; i ++){
    this.weigths.push(random() * 2 - 1);
  }
}

Neuron.prototype.activate = function(v){
  this.input = v;
    this.output = nthRoot(Math.atan(v) * 2 / Math.PI, 9) ;
    return this.output;
}


Neuron.prototype.feedforward = function(inputs){
  var sum = 0;
  for ( var i = 0; i < this.weigths.length; i++){
    sum += inputs[i] * this.weigths[i];
  }
  return this.activate(sum);
}

Neuron.prototype.draw = function(x,y, space){

  ellipseMode(CENTER)
  fill((this.output + 1) * 128);
  noStroke();
  ellipse(x,y,20,20);
  for (var i = 0 ; i < this.weigths.length  ; i ++){
    strokeWeight( abs(this.weigths[i]) * 3 );
    if ( this.weigths[i] > 0)
      stroke(200);
    else
      stroke(50);
    line( x-space, 50 + ( canvasSizeY - 100 ) / (this.weigths.length) * (i + 1)  ,x,y)
  }
}

function nthRoot(x, n) {
  if(x < 0 && n%2 != 1) return NaN; // Not well defined
  return (x < 0 ? -1 : 1) * Math.pow(Math.abs(x), 1/n);
}
