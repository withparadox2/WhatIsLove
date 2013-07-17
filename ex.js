window.requestAnimFrame = ( function() {
    return window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	function( callback ) {
	    window.setTimeout( callback, 1000 / 60 );
	};
})();

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    cw = 525,
    ch = 525,
    xPos = 0,
    yPos = 0,
	xVel = 0,
	yVel = 0,
	xAcc = 0,
	yAcc = 0,
	cwCenter = cw / 2,
	chCenter = ch / 2,
	radius = 3;

canvas.width = cw;
canvas.height = ch;

function drawShape(x, y){
	ctx.fillStyle="#FFF";
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, Math.PI*2, true);
	ctx.arc(cwCenter, chCenter, radius, 0, Math.PI*2, true);
	ctx.closePath();	
	ctx.fill();
}

function loop() {
    requestAnimFrame( loop );
    ctx.clearRect(0, 0, 525, 525);
	calculatePos();
    drawShape(xPos, yPos);
}

function calculatePos(){
	yVel = yVel + yAcc;
	yPos = yPos + yVel;
	if(yPos > 525) yPos = 0;
	if(yPos < 0  ) yPos = 525;
	if(Math.abs(yVel) < 0.1){
	   	yAcc = 0;
		yVel = 0;
	}
	xVel = xVel + xAcc;
	xPos = xPos + xVel;
	if(xPos > 525) xPos = 0;
	if(xPos < 0  ) xPos = 525;
	if(Math.abs(xVel) < 0.1){
	   	xAcc = 0;
		xVel = 0;
	}
}

function doKeyDown(evt){
	switch(evt.keyCode){
		case 38: //up arrow
			yAcc = -0.1;
			break;
		case 40: //down arrow
			yAcc = 0.1;
			break;
		case 37: //left arrow
			xAcc = -0.1;
			break;
		case 39: //down arrow
			xAcc = 0.1;
			break;
	}
}

function doKeyUp(evt){
	switch(evt.keyCode){
		case 38: //up arrow
			yAcc = (yVel < 0) ? 0.1 : -0.1;
			break;
		case 40: //down arrow
			yAcc = (yVel < 0) ? 0.1 : -0.1;
			break;
		case 37: //left arrow
			xAcc = (xVel < 0) ? 0.1 : -0.1;
			break;
		case 39: //down arrow
			xAcc = (xVel < 0) ? 0.1 : -0.1;
			break;
	}
}

window.onload=loop;
window.addEventListener('keydown', doKeyDown, true);
window.addEventListener('keyup', doKeyUp, true);
