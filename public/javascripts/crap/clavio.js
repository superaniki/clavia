
var canvas;
var context;
var FPS = 30;
var mousePos;
var message;
var keyboard;

var scales = { "Dur": [1,3,5,6,8,10,12] }
/*
<option value="1,3,5,6,8,10,12," selected="">Dur
</option><option value="1,3,4,6,8,9,11,">Ren moll
</option><option value="1,3,4,6,8,9,12,">Harmonisk moll
</option><option value="1,3,4,6,8,10,12,">Melodisk moll
</option><option value="1,3,5,6,8,9,12,">Harmonisk dur
</option><option value="1,2,3,4,5,6,7,8,9,10,11,12,">Kromatisk
</option><option value="1,3,5,6,8,10,12,">Jonisk
</option><option value="1,3,4,6,8,10,11,">Dorisk
</option><option value="1,2,4,6,8,9,11,">Frygisk
</option><option value="1,3,5,7,8,10,12,">Lydisk
</option><option value="1,3,5,6,8,10,11,">Mixolydisk
</option><option value="1,3,4,6,8,9,11,">Eolisk
</option><option value="1,2,4,6,7,9,11,">Lokrisk
</option><option value="1,4,6,7,8,11,">Blues
</option><option value="1,3,5,8,10,">Pentatonisk (Pentatonisk dur)
</option><option value="1,4,6,8,11,">Pentatonisk moll
</option><ption value="1,3,5,7,9,11,">Helton
</option><option value="1,2,4,5,7,8,10,11,">Halv/helton
</option><option value="1,3,4,6,7,9,10,12,">Hel/halvton
</option></select>
*/
function Keyboard() {
	
	// coordinates and units
	var x = 0;
	var y = 0;
	var width;
	var height;
	var whiteW = 50;
	var whiteH = 150;
	var blackW = whiteW*0.7;
	var blackH = whiteH*0.6;
	var keySpace = 4;
	var whiteX = []
	var blackX = []
	
	//keydata
	var startKey = 0;
	var key = [];
	var whiteKey = []; //referenses
	var blackKey = []; //referenses
	
	//whitekeys from 0 - 6 to render
	var setStartClaviatureKey = function keyNumber(num){
		
	};
	
	// used for hover-effects
	this.feel = function(mousex , mousey ){
		for(var t=0;t<whiteKey.length;t++)
			this.collideKey(mousex ,mousey ,whiteKey[t], whiteW, whiteH);
		for(var t=0;t<blackKey.length;t++)
			this.collideKey(mousex ,mousey ,blackKey[t], blackW, blackH);
	}
	
	this.collideKey = function(mousex ,mousey, key, keyWidth, keyHeight){
		var posx = x + key.x;
		var posy = y + key.y;

		if(mousex > posx && mousex < posx+keyWidth)
			if(mousey > posy && mousey < posy+keyHeight)
				key.hit = true;	
	}
	
	this.getKeyX = function(num){
		return x + key[num].x;
	}
	
	this.getKeyY = function(num){
		return y + key[num].y;
	}
	
	//calculate positions for all keys
	this.init = function(_x,_y){
		x = _x;
		y = _y;
		for(t=0;t<7;t++)
			whiteX[t] = (t*whiteW) + (t*keySpace);
			
		blackX[0] = whiteX[0]+(whiteW*0.55);
		blackX[1] = whiteX[2]+(whiteW*0.45) - blackW;
		blackX[2] = whiteX[3]+(whiteW*0.55);
		blackX[3] = whiteX[5]-(blackW*0.50) - (keySpace*0.5);
		blackX[4] = whiteX[6]+(whiteW*0.45) - blackW;

		key[0] = { num:0, type:'white', x:whiteX[0], y:0, blackKeyBehind: false, blackKeyBehindTouchable: false, hit: false };
		key[1] = { num:1, type:'black', x:blackX[0], y:0, blackKeyBehind: false, blackKeyBehindTouchable: false, hit: false }
		key[2] = { num:2, type:'white', x:whiteX[1], y:0, blackKeyBehind: true, blackKeyBehindTouchable: false, hit: false  }
		key[3] = { num:3, type:'black', x:blackX[1], y:0, blackKeyBehind: false, blackKeyBehindTouchable: false, hit: false  }
		key[4] = { num:4, type:'white', x:whiteX[2], y:0, blackKeyBehind: true, blackKeyBehindTouchable: true, hit: false  }
		key[5] = { num:5, type:'white', x:whiteX[3], y:0, blackKeyBehind: false, blackKeyBehindTouchable: false, hit: false  }
		key[6] = { num:6, type:'black', x:blackX[2], y:0, blackKeyBehind: false, blackKeyBehindTouchable: false, hit: false  }
		key[7] = { num:7, type:'white', x:whiteX[4], y:0, blackKeyBehind: true, blackKeyBehindTouchable: false, hit: false  }
		key[8] = { num:8, type:'black', x:blackX[3], y:0, blackKeyBehind: false, blackKeyBehindTouchable: false, hit: false  }
		key[9] = { num:9, type:'white', x:whiteX[5], y:0, blackKeyBehind: true, blackKeyBehindTouchable: true, hit: false  }
		key[10] = { num:10, type:'black', x:blackX[4], y:0, blackKeyBehind: false, blackKeyBehindTouchable: false, hit: false  }
		key[11] = { num:11, type:'white', x:whiteX[6], y:0, blackKeyBehind: true, blackKeyBehindTouchable: true, hit: false  }
		
		// x.hasOwnProperty
		key[2].extraDraw = key[1];
		key[4].extraDraw = key[3];
		key[7].extraDraw = key[6];
		key[9].extraDraw = key[8];
		key[11].extraDraw = key[10];
		
		whiteKey[0] = key[0];
		whiteKey[1] = key[2];
		whiteKey[2] = key[4];
		whiteKey[3] = key[5];
		whiteKey[4] = key[7];
		whiteKey[5] = key[9];
		whiteKey[6] = key[11];
		blackKey[0] = key[1];
		blackKey[1] = key[3];
		blackKey[2] = key[6];
		blackKey[3] = key[8];
		blackKey[4] = key[10];
	}

	 var drawWhiteKeys = function(_x,_y){
		context.fillStyle = "white";
		for(var t=0;t<whiteKey.length;t++)
			if(whiteKey[t].hit != true)
				context.fillRect(_x+whiteKey[t].x,_y+whiteKey[t].y,whiteW,whiteH);
	}

	var drawBlackKeys = function(_x,_y){
		context.fillStyle = "black";
		for(var t=0;t<blackKey.length;t++)
			if(blackKey[t].hit != true)
				context.fillRect(_x+blackKey[t].x,_y+blackKey[t].y,blackW,blackH);		
	}

	this.draw = function(){
		drawWhiteKeys(x,y);
		drawBlackKeys(x,y);
	}
	
	/*
	this.publicVar  = 'tjo'   // public variabel
    var privateVar  = 'tjo'   // privat variabel OBS - publika funktioner hittar inte denna!!
	
	this.init = function(){} // public funktion // kan inte accessa privata variabler
	this.init   =====   Object.prototype.init;
	function tjoo(){} 		 // privat funktion
	
	OBS
	function membername(...) {...} ==== var membername = function membername(...) {...};
	*/
}


var lingrad;

function init() {
	canvas = document.getElementById('myCanvas');
	context = canvas.getContext('2d');
	width = canvas.width;
	height = canvas.height;
	
	$(document).mousemove(onMouseMove);
	
    keyboard = new Keyboard();
	keyboard.init(0,0);
	
	gradient = context.createLinearGradient(0, 0, 0, canvas.height*2);
	gradient.addColorStop(0,'#7FFA7A');
	gradient.addColorStop(1,'#000000');
    //canvasMinX = $('#myCanvas').offset().left; // hämtar position i relation till dokumentet
	//.position hämtar i relation till parent!
	// lämnar left och right
    //canvasMaxX = canvasMinX + WIDTH;
    //intervalId = setInterval(draw, 10);
	//return intervalId;
}


function update(){
	keyboard.feel(mousePos.x,mousePos.y);
	
}

function draw(){
	
	context.fillStyle = gradient;
	context.fillRect(0, 0, canvas.width, canvas.height);
	//context.clearRect(0, 0, canvas.width, canvas.height);
	keyboard.draw();
	//writeMessage(canvas, message);
}


setInterval(function() {
	update();
	draw();
}, 1000/FPS);

function writeMessage(canvas, message) {
	
	context.font = '18pt Calibri';
	context.fillStyle = 'black';
	context.fillText(message, 10, 125);
	for(t=0;t<7;t++)
		context.fillText(keyboard.getKeyX(t), 10, 145+(t*10));
}

function onMouseMove(event){
	mousePos = getMousePos(canvas, event);
	message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
}

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
	  x: evt.clientX - rect.left,
	  y: evt.clientY - rect.top
	};
}

init();



