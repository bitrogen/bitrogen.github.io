let a = 50;

function setup() {
  createCanvas(800, 800);
  background(20,25,30);
  stroke(255);
  strokeWeight(3)
}

function draw() {
  a++;
  b = 800-a
  colorMode(HSB, 400,100,100)
  noStroke()
  fill(a%400+10,100,100)
  circle(a,a, b/8);
  circle(a,b, b/8);
  circle(b,a, b/8);
  circle(b,b, b/8);
  circle(a, width/2, b/8)
  circle(b, width/2, b/8)
  circle(width/2,a, b/8)
  circle(width/2,b, b/8)
  if (a == 390){
    noLoop()
  }
  
}
function mousePressed() {
  noLoop();
}

function mouseReleased() {
  loop();
}
