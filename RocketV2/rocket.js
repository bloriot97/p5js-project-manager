function Rocket(pos){

  this.dna = new DNA(dnaLength);
  this.position = pos;
  this.velocity = createVector((random() - 0.5) * 2,( random() - 0.5) * 2);
  this.acceleration = createVector(0,0);
  this.size = 10;
  this.step = 1;
  this.dead = false;
  this.crash = false;
  this.closest = 400;
  this.closestTime = 0;
  this.fitness = 0;

  this.distTrav = 0;
  this.avgSpeed = 0;

  this.minDist100 = 30;
  this.tMoins100Pos = createVector(pos.x, pos.y);
  this.warning = 0;
  this.maxTime = 5000;


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
      var a = -atan2(this.velocity.x, this.velocity.y) + PI;

      for (var i = 0 ; i < this.dna.length ; i ++){
        this.dna.getGene(i).eye.rotate(a);
        this.dna.getGene(i).jet.rotate(a);

        for (var w = 0 ; w < walls.length ; w ++){
          if ( walls[w].isIn( p5.Vector.add( this.dna.getGene(i).eye, this.position) ) ){
            this.acceleration.add(this.dna.getGene(i).jet);
          }
        }
        this.dna.getGene(i).eye.rotate(-a);
        this.dna.getGene(i).jet.rotate(-a);
      }

    }
  }
  this.update = function(){
    if ( !this.dead){
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
      this.distTrav += this.velocity.mag();
      this.step += 1;
      this.avgSpeed = this.distTrav / this.step;

      if ( this.step % 100 == 0){
        var d = dist(this.position.x, this.position.y, this.tMoins100Pos.x, this.tMoins100Pos.y);
        if ( d < this.minDist100 ){
          if ( this.warning > 2){
            this.dead = true;

          }
          this.warning += 1;
        } else {

          this.warning = 0;
        }
        this.tMoins100Pos = createVector(this.position.x, this.position.y);
      }

      var d = dist(this.position.x, this.position.y, targetPos.x, targetPos.y);
      if ( d < this.closest){
        this.closest = d;
        this.closestTime = this.step;
      }
      if ( this.step > this.maxTime){
        this.dead = true;
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
      rectMode(CENTER);
      var a = -atan2(this.velocity.x, this.velocity.y) + PI;
      translate(this.position.x, this.position.y);
      tint(255, 84, 0);
      rotate(a);
      image(rocketImg,  -this.size / 2 , -this.size, this.size , this.size * 2 );
      pop();
    } else {
      push();
      rectMode(CENTER);
      var a = -atan2(this.velocity.x, this.velocity.y) + PI ;
      translate(this.position.x, this.position.y);
      rotate(a);
      image(rocketImg,  -this.size / 2 , -this.size, this.size , this.size * 2 );

      pop();
    }
  }

  this.showInfo = function(){
    push();
    var a = -atan2(this.velocity.x, this.velocity.y) + PI  ;
    translate(this.position.x, this.position.y);
    rotate(a);
    stroke(255,0,0);
    for (var i = 0 ; i < this.dna.length ; i ++){
      point(this.dna.getGene(i).eye.x, this.dna.getGene(i).eye.y);
    }
    pop();
  }

  this.getFitness = function(){
    //this.fitness = max(1 - (this.closest / 400), 0);
    this.fitness = this.avgSpeed * this.distTrav;

    return this.fitness;
  }
}
