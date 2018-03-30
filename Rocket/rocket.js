function Rocket(pos){

  this.dna = new DNA(dnaLength);
  this.position = pos;
  this.velocity = createVector(0,0);
  this.acceleration = createVector(0,0);
  this.size = 10;
  this.step = 0;
  this.dead = false;
  this.crash = false;
  this.closest = 400;
  this.closestTime = 0;
  this.fitness = 0;


  this.randomDNA = function(){
    this.dna.randomDNA();
    return this;
  }
  this.sonOf = function(a,b){
    this.dna = a.dna.cross(b.dna);
    return this;
  }
  this.mutate = function(factor){
    this.dna = this.dna.mutate(factor);
    return this;
  }
  this.applyforce = function(){
    if ( !this.dead ){
      this.acceleration.add(this.dna.getGene(this.step));
      this.step ++;
    }
  }
  this.update = function(){
    if ( !this.dead){
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
      var d = dist(this.position.x, this.position.y, targetPos.x, targetPos.y);
      if ( d < this.closest){
        this.closest = d;
        this.closestTime = this.step;
      }
      if ( this.position.x < 0
        || this.position.y < 0
        || this.position.x > 400
        || this.position.y > 400){
        this.dead = true;
      }
      for (var i = 0 ; i < walls.length ; i ++){
        if ( walls[i].isIn(this.position) ){
          this.dead = true;
          this.crash = true;
        }
      }

    }
  }
  this.show = function(){
    if ( this.dead ){
      push();
      translate(this.position.x, this.position.y);
      fill(255, 84, 0);
      ellipse(0, 0, this.size, this.size);
      pop();
    } else {
      push();
      translate(this.position.x, this.position.y);
      ellipse(0, 0, this.size, this.size);
      pop();
    }
  }

  this.getFitness = function(){
    //this.fitness = max(1 - (this.closest / 400), 0);
    this.fitness = 1/min((this.closest / 400), 1);
    //this.fitness *= this.fitness;
    if ( this. crash){
      this.fitness = this.fitness * 0.8;
    }
    return this.fitness;
  }
}
