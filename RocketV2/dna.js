function DNA(length){
  this.genes = [];
  this.length = length;


  for (var i = 0 ; i < length ; i ++){
    this.genes.push( new Jet() );
  }

  this.randomDNA = function() {
    for (var i = 0 ; i < length ; i ++){
      this.genes[i] = new Jet();
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
        this.setGene(i, new Jet() );
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

}
