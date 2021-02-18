var cnv = document.querySelector('canvas');
var cnt = cnv.getContext('2d');

const drawRect = (x,y,w,h,color) => {
    cnt.fillStyle=color;
    cnt.fillRect(x,y,w,h);
}
const drawText= (text,x,y,color) => {
    cnt.fillStyle=color;
    cnt.font = '50px sans-serif';
    cnt.fillText(text,x,y);
}

const resetBall = () => {
    ball.x = cnv.width/2;
    ball.y = cnv.height/2;
    ball.speed = 5;
    ball.velocityX = 3;
    ball.velocityY = 4;
    ball.stop=true;
}

const drawCirclef = (x,y,r,color) => {
    cnt.fillStyle=color;
    cnt.beginPath();
    cnt.arc(x,y,r,0,2*Math.PI);
    cnt.closePath();
    cnt.fill();
}
const drawCircleS = (x,y,r,w,color) => {
    cnt.strokeStyle=color;
    cnt.lineWidth=w;
    cnt.beginPath();
    cnt.arc(x,y,r,0,2*Math.PI);
    cnt.closePath();
    cnt.stroke();
}
const user = {
    x:20,
    y:cnv.height/2-50,
    w:10,
    h:100,
    color:'#fff',
    score:0
}
const compt = {
    x:cnv.width-30,
    y:cnv.height/2-50,
    w:10,
    h:100,
    color:'#fff',
    score:0
}
const ball = {
    x: cnv.width/2,
    y: cnv.height/2,
    r:13,
    color: 'purple',
    speed: 5,
    velocityX:3,
    velocityY:4,
    stop: true
}
const MovePedal = (e) => {
    if (e.keyCode == 38 && user.y > 0-(user.y/2)) {
        console.log('ust');
        user.y -=35;
    }
    if( e.keyCode == 40 && user.y+100 < cnv.height) {
        console.log('alt');
        user.y +=35;
    }
    
}
const Colect = (b,p) => {
    b.top = b.y -b.r;
    b.bottom = b.y+b.r;
    b.left = b.x-b.r;
    b.right = b.x+b.r;
    
    p.top = p.y;
    p.bottom = p.y+p.h;
    p.left = p.x;
    p.right = p.x+p.w;

    return (b.top < p.bottom && b.bottom > p.top && b.left < p.right && b.right > p.left) ? true:false;
}

const states = () => {
    var top = ball.y-ball.r;
    var bottom = ball.y+ball.r;
    var left = ball.x-ball.r;
    var right = ball.x+ball.r;

    return (bottom > user.y || top < user.y+user.h) ? true : false;
}
document.addEventListener('keydown',MovePedal.bind(this));

const update = () => {
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    if(ball.y+ball.r>cnv.height || ball.y-ball.r < 0) {
        ball.velocityY = -ball.velocityY;
    }

    let player = (ball.x < cnv.width/2) ? user:compt; 
    if(Colect(ball,player)) {
        let Interangeltranslate = ball.y -(player.y + player.h/2)
        Interangeltranslate /= player.h/2;
        let MaxAngle = Math.PI/3;
        let myAngle = Interangeltranslate*MaxAngle;

        let direction = (ball.x < cnv.width/2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(myAngle);
        ball.velocityY = ball.speed * Math.sin(myAngle);

        ball.speed+=0.2;
    }

    if(ball.x > cnv.width) {
        user.score++;
        resetBall();
    }
    else if(ball.x<0){
        compt.score++;
        resetBall();

    }


    let Comlvl = 0.1;
    compt.y += (ball.y -(compt.y + compt.h/2)) * Comlvl;
}


const render= () => {
    drawRect(0,0,cnv.width,cnv.height,'#008365');
    drawRect(cnv.width/2 -2,0,4,cnv.height,'#fff');
    drawCirclef(cnv.width/2,cnv.height/2,8,'#fff');
    drawCircleS(cnv.width/2,cnv.height/2,50,4,'#fff');
    drawText(user.score,cnv.width/4,100,'#fff');
    drawText(compt.score,3*cnv.width/4,100,'#fff');

    drawRect(user.x,user.y,user.w,user.h,user.color);
    drawRect(compt.x,compt.y,compt.w,compt.h,compt.color);
    drawCirclef(ball.x,ball.y,ball.r,ball.color);
}
const game = () => {
    update();
    render();
}

const fps = 60;
setInterval(game,1000/fps); 
