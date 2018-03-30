function Jet(){
  this.eyeMaxDist = 40;
  this.eyeAngle = random() * TWO_PI;
  this.eyeDist = random() * this.eyeMaxDist;
  this.eye = createVector( cos(this.eyeAngle) * this.eyeDist, sin(this.eyeAngle) * this.eyeDist );

  this.jetMaxForce = 0.025;
  this.jetAngle = random() * TWO_PI;
  this.jetForce = random() * this.jetMaxForce;
  this.jet = createVector( cos(this.jetAngle) * this.jetForce, sin(this.jetAngle) * this.jetForce );

}
