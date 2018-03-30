function Layer(nbr, prevNbr){
  this.neurons = [];
  for (var i = 0; i < nbr; i ++){
    this.neurons.push(new Neuron(prevNbr+1));
  }
}


Layer.prototype.feedforward = function(inputs){
  var res = [];
  var i = inputs;
  i.push(1);
  for ( var i = 0; i < this.neurons.length; i ++){
    res.push( this.neurons[i].feedforward(inputs));
  }
  return res;
}

Layer.prototype.draw = function(pos, space){
  for ( var i = 0; i < this.neurons.length; i++){
    this.neurons[i].draw(pos, 50 + ( canvasSizeY - 100 ) / (this.neurons.length + 1) * (i + 1), space );
  }
}
