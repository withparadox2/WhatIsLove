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
    nodeObjects = new Array(),
    boy,
    girl,
    moveFlag = false,
    keysDown = {},
    keyCode;

function init(){
    canvas.width = cw;
    canvas.height = ch;
    addNodes();
}

function drawWorld(){
    var xc = 290,
	yc = 80;
    ctx.strokeStyle="#12867f";
    ctx.beginPath();
    ctx.moveTo(xc,                      yc);
    ctx.lineTo(xc - 60,                 yc - 60);
    ctx.lineTo(xc - 60 - 80,            yc - 60);
    ctx.lineTo(xc - 60 - 80 - 80,       yc - 60 + 80);
    ctx.lineTo(xc - 60 - 80 - 80,       yc - 60 + 80 + 140);
    ctx.lineTo(xc - 60 - 80 - 80 + 220, yc - 60 + 80 + 140 + 220);
    ctx.lineTo(xc + 60 + 80 + 80,       yc - 60 + 80 + 140);
    ctx.lineTo(xc + 60 + 80 + 80,       yc - 60 + 80);
    ctx.lineTo(xc + 60 + 80,            yc - 60);
    ctx.lineTo(xc + 60,                 yc - 60);
    ctx.lineTo(xc,                      yc);
    ctx.stroke();
}

function node(xPos, yPos, up, upRight, right, rightDown, down, downLeft, left, leftUp){
    this.x = xPos;
    this.y = yPos;
    this.keyDirection = [up, upRight, right, rightDown, down, downLeft, left, leftUp];
}

function addNodes(){
    nodeObjects.push(new node(290, 80, -1, 9, -1, -1, -1, -1, -1, 1));
    nodeObjects.push(new node(230, 20, -1, -1, -1, 0, -1, -1, 2, -1));
    nodeObjects.push(new node(150, 20, -1, -1, 1, -1, -1, 3, -1, -1));

    nodeObjects.push(new node(70, 100, -1, 2, -1, 4, -1, -1, -1, -1));
    nodeObjects.push(new node(70, 240, 3, -1, -1, 5, -1, -1, -1, -1));
    nodeObjects.push(new node(290, 460, -1, 6, -1, -1, -1, -1, -1, 4));

    nodeObjects.push(new node(510, 240, 7, -1, -1, -1, -1, 5, -1, -1));
    nodeObjects.push(new node(510, 100, -1, -1, -1, -1, 6, -1, -1, 8));
    nodeObjects.push(new node(430, 20, -1, -1, -1, 7, -1, -1, 9, -1));

    nodeObjects.push(new node(350, 20, -1, -1, 8, -1, -1, 0, -1, -1));
} 

function person(xPos, yPos, nodeIndex, girlOrBoy, radius){
    this.x = xPos;
    this.y = yPos;
    this.nodeIndex = nodeIndex;
    this.girlOrBoy = girlOrBoy;
    this.radius = radius;
    this.updateFlag = false;
    this.newNodeIndex = nodeIndex;
    this.newX = -100;
    this.newY = -100;
    this.moveOrNot = false;
    this.updatePos = function(){
	var stepSize = 2;
	if(this.moveOrNot){
	    switch(keyCode){ 
		case 87:
		    if(keysDown[87]){
			//w
			this.y = this.y - stepSize;
		    }
		case 69:
		    if(keysDown[69]){
			//e
			this.x = this.x + stepSize;
			this.y = this.y - stepSize;
		    }
		case 68:
		    if(keysDown[68]){
			//d
			this.x = this.x + stepSize;
		    }
		case 67:
		    if(keysDown[67]){
			//c
			this.x = this.x + stepSize;
			this.y = this.y + stepSize;
		    }
		case 83:
		    if(keysDown[83]){
			//s
			this.y = this.y + stepSize;
		    }
		case 90:
		    if(keysDown[90]){
			//z
			this.x = this.x - stepSize;
			this.y = this.y + stepSize;
		    }
		case 65:
		    if(keysDown[65]){
			//a
			this.x = this.x - stepSize;
		    }
		case 81:
		    if(keysDown[81]){
			//q
			this.x = this.x - stepSize;
			this.y = this.y - stepSize;
		    }
	    }

	    //end move
	    if(Math.abs(this.x - this.newX) < 3 && Math.abs(this.y - this.newY) < 3){
		this.x = this.newX;
		this.y = this.newY;
		this.newX = -100;
		this.newY = -100;
		this.nodeIndex = this.newNodeIndex;
		moveFlag = false;
		keysDown[keyCode] = false;
	    }
	}
    }
}

function calculateNewPos(keyCode){
    var	getIndex,
	keyDirectionCode;
    switch(keyCode){
	case 87:
	    keyDirectionCode = 0;
	    break;
	case 69:
	    keyDirectionCode = 1;
	    break;
	case 68:
	    keyDirectionCode = 2;
	    break;
	case 67:
	    keyDirectionCode = 3;
	    break;
	case 83:
	    keyDirectionCode = 4;
	    break;
	case 90:
	    keyDirectionCode = 5;
	    break;
	case 65:
	    keyDirectionCode = 6;
	    break;
	case 81:
	    keyDirectionCode = 7;
	    break;
    }
    getIndex = nodeObjects[boy.nodeIndex].keyDirection[keyDirectionCode];
    if(getIndex !== -1){
	boy.newX = nodeObjects[getIndex].x;
	boy.newY = nodeObjects[getIndex].y;
	boy.newNodeIndex = getIndex;
	boy.moveOrNot = true;
    }
}

init();
boy = new person(nodeObjects[0].x, nodeObjects[0].y, 0, true, 5);

function drawBoy(x, y, radius){
    ctx.fillStyle="#FF0000";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2, true);
    ctx.closePath();    
    ctx.fill();
}


function loop() {
    requestAnimFrame( loop );
    ctx.clearRect(0, 0, 525, 525);
    if(moveFlag){
	boy.updatePos();
    }
    drawBoy(boy.x, boy.y, boy.radius);
    drawWorld();
}



function doKeyDown(evt){
    if(!keysDown[evt.keyCode]){
	keyCode = evt.keyCode;
	keysDown[evt.keyCode] = true;
	moveFlag = true;
	calculateNewPos(evt.keyCode);
    }
}


window.addEventListener('keydown', doKeyDown, true);
window.onload=loop;

