let a = 50;

function setup() {
  createCanvas(600, 600);
  background(20,25,30);
  stroke(255);
  strokeWeight(3)
}

function draw() {
  a++;
  b = 600-a
  colorMode(HSB, 300,100,100)
  noStroke()
  fill(a%300+10,100,100)
  circle(a,a, b/8);
  circle(a,b, b/8);
  circle(b,a, b/8);
  circle(b,b, b/8);
  circle(a, width/2, b/8)
  circle(b, width/2, b/8)
  circle(width/2,a, b/8)
  circle(width/2,b, b/8)
  if (a == 290){
    noLoop()
  }
  
}
function mousePressed() {
  noLoop();
}

function mouseReleased() {
  loop();
}
