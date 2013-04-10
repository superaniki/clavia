
    
var x = 150;
var y = 150;
var dx = 2;
var dy = 4;
var WIDTH;
var HEIGHT;
var ctx;
var canvas;
var paddlex;
var paddleh = 10;
var paddlew = 75;
var rightDown = false;
var leftDown = false;
var canvasMinX = 0;
var canvasMaxX = 0;
var intervalId = 0;

function onMouseMove(evt) {
  if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
    paddlex = evt.pageX - canvasMinX;
  }
}

//set rightDown or leftDown if the right or left keys are down
function onKeyDown(evt) {
	if (evt.keyCode == 39) rightDown = true;
		else 
			if (evt.keyCode == 37) leftDown = true;
}
//and unset them when the right or left key is released
function onKeyUp(evt) {
	if (evt.keyCode == 39) rightDown = false;
	else if (evt.keyCode == 37) leftDown = false;
}

function init() {
	canvas = document.getElementById('myCanvas');
	ctx = canvas.getContext('2d');
	WIDTH = canvas.width;
	HEIGHT = canvas.height;
    
    
    paddlex = WIDTH / 2;
    canvasMinX = $('#myCanvas').offset().left;
    canvasMaxX = canvasMinX + WIDTH;
    intervalId = setInterval(draw, 10);
	return intervalId;
}

function circle(x,y,r) {
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fill();
}
function rect(x,y,w,h) {
	ctx.beginPath();
	ctx.rect(x,y,w,h);
	ctx.closePath();
	ctx.fill();
}
function clear() {
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function init_paddle() {
  paddlex = WIDTH / 2;
  paddleh = 10;
  paddlew = 75;
}

function init_mouse() {
  canvasMinX = canvas.offset().left;
  canvasMaxX = canvasMinX + WIDTH;
  canvasMinY
}

function draw() {
    clear();
	circle(x,y,10);
	
	//move the paddle if left or right is currently pressed
	if (rightDown) paddlex += 5;
		else if (leftDown) paddlex -= 5;
			rect(paddlex, HEIGHT-paddleh, paddlew, paddleh);

	if (x + dx > WIDTH || x + dx < 0)
		dx = -dx;

	if (y + dy < 0)
		dy = -dy;
	else if (y + dy > HEIGHT) {
		if (x > paddlex && x < paddlex + paddlew)
			dy = -dy;
		else
			clearInterval(intervalId);
	}
	x += dx;
	y += dy;
}

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);
$(document).mousemove(onMouseMove);


init();
init_mouse();
init_paddle();


// return setInterval(draw, 10); rita en frame var tionde millisekund

/*
var rectWidth = 920;
var rectHeight = 600;
var backgroundColor = 

var FPS = 120;

function draw(){
	//context.translate(canvas.width / 2, canvas.height / 2);
	context.fillStyle = "white";
	context.fillRect(rectWidth / -2, rectHeight / -2, rectWidth, rectHeight);
	context.beginPath();
	context.moveTo(10 ,10);
	context.lineWidth = 5;
	context.lineTo(canvas.width,canvas.height);
	context.stroke();
}

function update(){
	rectWidth +=1 ;
	rectHeight +=1;
}

setInterval(function() {
	update();
	draw();
}, 1000/FPS);
*/