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
	xPos = 0,
	yPos = 0;


function drawShape(x, y){
	ctx.fillStyle='#FF0000';
	ctx.fillRect(x, y, 20, 10);
}

ctx.fillRect(20,20,40,40);

function loop() {
	requestAnimFrame( loop );
	ctx.clearRect(0, 0, 525, 525);
	drawShape(xPos, yPos);
	xPos = xPos + 2;
	yPos = yPos + 2;
	if(xPos > 525) xPos = 0;
	if(yPos > 525) yPos = 0;
}

//window.onload=loop;
