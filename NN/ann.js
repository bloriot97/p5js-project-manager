var learningSpeed = 0.1;

function Ann(il, l, ol){
  this.layers = [];

  this.layers.push(new Layer(l[0], il));
  for ( var i = 1; i < l.length; i ++){
    this.layers.push( new Layer(l[i], l[i-1]));
  }
  this.layers.push(new Layer(ol, l[l.length - 1]));


}



Ann.prototype.feedforward = function(inputs){
  var res = inputs;
  for ( var i = 0; i < this.layers.length; i++){
    res = this.layers[i].feedforward(res);
  }
  return res;
}

Ann.prototype.feedback = function(error){

}

Ann.prototype.train = function(n, iGen, outputCheck){
  for (var i = 0; i < n; i ++){
    var input = iGen();
    var output = this.feedforward(input);
    this.feedback(outputCheck(input, output));
  }
}

Ann.prototype.draw = function(){
  push();
//  nostroke();
  for ( var i = 0; i < this.layers.length; i++){
    this.layers[i].draw(50 + (canvasSizeX-100) / (this.layers.length) * (i+1), (canvasSizeX-100) / (this.layers.length) );
  }
  pop();
}
