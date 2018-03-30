function DNA(length){
  this.genes = [];
  this.maxForce = 0.2;
  this.length = length;

  this.createGene = function(){
    var angle = random(TWO_PI);
    return createVector(cos(angle) * this.maxForce, sin(angle) * this.maxForce );
  }

  for (var i = 0 ; i < length ; i ++){
    this.genes.push(createVector(0,1));
  }

  this.randomDNA = function() {
    for (var i = 0 ; i < length ; i ++){
      this.genes[i] = this.createGene();
    }
  }

  this.cross = function(b) {
    var midCross = int(random(0, this.length));
    var child = new DNA(this.length);
    for ( var i = 0; i < this.length; i ++){
      if ( i < midCross){
        child.setGene(i, this.getGene(i) );
      } else {
        child.setGene(i, b.getGene(i) );
      }
    }
    return child;
  }
  this.mutate = function(factor){
    for ( var i = 0; i < this.length; i ++){
      if ( random() < factor){
        this.setGene(i, this.createGene());
      }
    }
    return this;
  }

  this.setGene = function(i,g){
    this.genes[i] = g;
  }
  this.getGene = function(i){
    return this.genes[i];
  }

  this.getGene = function(i){
    return this.genes[i];
  }

}
