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
    ctx.moveTo(nodeObjects[ 0].x,  nodeObjects[ 0].y);
    ctx.lineTo(nodeObjects[ 1].x,  nodeObjects[ 1].y);
    ctx.lineTo(nodeObjects[ 2].x,  nodeObjects[ 2].y);
    ctx.lineTo(nodeObjects[ 3].x,  nodeObjects[ 3].y);
    ctx.lineTo(nodeObjects[ 4].x,  nodeObjects[ 4].y);

    ctx.moveTo(nodeObjects[ 6].x,  nodeObjects[ 6].y);
    ctx.lineTo(nodeObjects[ 7].x,  nodeObjects[ 7].y);
    ctx.lineTo(nodeObjects[ 8].x,  nodeObjects[ 8].y);
    ctx.lineTo(nodeObjects[10].x,  nodeObjects[10].y);
    ctx.lineTo(nodeObjects[11].x,  nodeObjects[11].y);
    ctx.lineTo(nodeObjects[12].x,  nodeObjects[12].y);
    ctx.lineTo(nodeObjects[13].x,  nodeObjects[13].y);
    ctx.lineTo(nodeObjects[14].x,  nodeObjects[14].y);
    ctx.lineTo(nodeObjects[35].x,  nodeObjects[35].y);
    ctx.lineTo(nodeObjects[36].x,  nodeObjects[36].y);

    ctx.moveTo(nodeObjects[15].x,  nodeObjects[15].y);
    ctx.lineTo(nodeObjects[16].x,  nodeObjects[16].y);
    ctx.lineTo(nodeObjects[17].x,  nodeObjects[17].y);
    ctx.lineTo(nodeObjects[18].x,  nodeObjects[18].y);
    ctx.lineTo(nodeObjects[19].x,  nodeObjects[19].y);
    ctx.lineTo(nodeObjects[ 0].x,  nodeObjects[ 0].y);
    ctx.lineTo(nodeObjects[37].x,  nodeObjects[37].y);

    ctx.moveTo(nodeObjects[ 9].x,  nodeObjects[ 9].y);
    ctx.lineTo(nodeObjects[24].x,  nodeObjects[24].y);
    ctx.lineTo(nodeObjects[25].x,  nodeObjects[25].y);
    ctx.lineTo(nodeObjects[27].x,  nodeObjects[27].y);
    ctx.lineTo(nodeObjects[28].x,  nodeObjects[28].y);

    ctx.moveTo(nodeObjects[ 0].x,  nodeObjects[ 0].y);
    ctx.lineTo(nodeObjects[29].x,  nodeObjects[29].y);
    ctx.lineTo(nodeObjects[30].x,  nodeObjects[30].y);
    ctx.lineTo(nodeObjects[31].x,  nodeObjects[31].y);
    ctx.lineTo(nodeObjects[32].x,  nodeObjects[32].y);
    ctx.lineTo(nodeObjects[33].x,  nodeObjects[33].y);
    ctx.lineTo(nodeObjects[34].x,  nodeObjects[34].y);

    ctx.moveTo(nodeObjects[19].x,  nodeObjects[19].y);
    ctx.lineTo(nodeObjects[38].x,  nodeObjects[38].y);
    ctx.lineTo(nodeObjects[17].x,  nodeObjects[17].y);
 
    ctx.moveTo(nodeObjects[ 1].x,  nodeObjects[ 1].y);
    ctx.lineTo(nodeObjects[20].x,  nodeObjects[20].y);
    ctx.lineTo(nodeObjects[21].x,  nodeObjects[21].y);
    
    ctx.moveTo(nodeObjects[20].x,  nodeObjects[20].y);
    ctx.lineTo(nodeObjects[22].x,  nodeObjects[22].y);
    ctx.lineTo(nodeObjects[23].x,  nodeObjects[23].y);
    ctx.stroke();
}

function node(xPos, yPos, up, upRight, right, rightDown, down, downLeft, left, leftUp){
    this.x = xPos;
    this.y = yPos;
    this.keyDirection = [up, upRight, right, rightDown, down, downLeft, left, leftUp];
}


function addNodes(){
    nodeObjects.push(new node(290,  80, -1, 19, -1, -1, 37, 29, -1,  1));
    nodeObjects.push(new node(230,  20, -1, -1, -1,  0, -1, -1,  2, -1));
    nodeObjects.push(new node(150,  20, -1, -1,  1, -1, -1,  3, -1, -1));
    nodeObjects.push(new node( 70, 100, -1,  2, -1, -1,  4, -1, -1, -1));
    nodeObjects.push(new node( 70, 120,  3, -1, -1, -1, -1, -1, -1, -1));
    nodeObjects.push(new node( 70, 230, -1, -1, -1, -1, -1, -1, -1, -1));
    nodeObjects.push(new node( 70, 240, -1, -1,  7, -1, -1, -1, -1, -1));
    nodeObjects.push(new node(150, 240, -1, -1, -1, -1,  8, -1,  6, -1));
    nodeObjects.push(new node(150, 320,  7, -1, -1,  9, -1, -1, -1, -1));
    nodeObjects.push(new node(180, 350, -1, 24, -1, 10, -1, -1, -1,  8));
    nodeObjects.push(new node(290, 460, -1, 11, -1, -1, -1, -1, -1,  9));
    nodeObjects.push(new node(390, 360, 12, -1, -1, -1, -1, 10, -1, -1));
    nodeObjects.push(new node(390, 310, -1, -1, 13, -1, 11, -1, -1, -1));
    nodeObjects.push(new node(440, 310, -1, 14, -1, -1, -1, -1, 12, -1));
    nodeObjects.push(new node(470, 280, -1, -1, -1, -1, -1, 13, -1, 26));
    nodeObjects.push(new node(477, 273, -1, 16, -1, -1, -1, -1, -1, -1));
    nodeObjects.push(new node(510, 240, 17, -1, -1, -1, -1, 15, -1, -1));
    nodeObjects.push(new node(510, 100, -1, -1, -1, -1, 16, -1, 38, 18));
    nodeObjects.push(new node(430,  20, -1, -1, -1, 17, -1, -1, 19, -1));
    nodeObjects.push(new node(350,  20, -1, -1, 18, 38, -1,  0, -1, -1));
    nodeObjects.push(new node(230,  50,  1, -1, -1, -1, 22, -1, 21, -1));
    nodeObjects.push(new node(150,  50, -1, -1, 20, -1, -1, -1, -1, -1));
    nodeObjects.push(new node(230,  80, 20, -1, -1, -1, -1, -1, 23, -1));
    nodeObjects.push(new node(150,  80, -1, -1, 22, -1, -1, -1, -1, -1));
    nodeObjects.push(new node(230, 300, -1, -1, 25, -1, -1,  9, -1, -1));
    nodeObjects.push(new node(320, 300, -1, 26, -1, -1, -1, -1, 24, -1));
    nodeObjects.push(new node(405, 215, -1, 27, -1, 14, -1, 25, -1, 35));
    nodeObjects.push(new node(430, 190, 28, -1, -1, -1, -1, 26, -1, -1));
    nodeObjects.push(new node(430, 110, -1, -1, -1, -1, 27, -1, -1, -1));
    nodeObjects.push(new node(230, 140, -1,  0, -1, -1, -1, -1, 30, -1));
    nodeObjects.push(new node(150, 140, -1, -1, 29, -1, 31, -1, -1, -1));
    nodeObjects.push(new node(150, 230, 30, -1, 32, -1, -1, -1, -1, -1));
    nodeObjects.push(new node(190, 230, -1, 33, -1, -1, -1, -1, 31, -1));
    nodeObjects.push(new node(240, 180, -1, -1, 34, -1, -1, 32, -1, -1));
    nodeObjects.push(new node(280, 180, -1, -1, -1, -1, -1, -1, 33, -1));
    nodeObjects.push(new node(370, 180, -1, -1, -1, 26, -1, -1, 36, -1));
    nodeObjects.push(new node(300, 180, -1, -1, 35, -1, -1, -1, -1, -1));
    nodeObjects.push(new node(290, 170,  0, -1, -1, -1, -1, -1, -1, -1));
    nodeObjects.push(new node(430, 100, -1, -1, 17, -1, -1, -1, -1, 19));
    
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
    this.updatePos = function(){
	var stepSize = 2;
	if(moveFlag){
	    switch(keyCode){ 
		case 87:
			//w
			this.y = this.y - stepSize;
			break;
		case 69:
			//e
			this.x = this.x + stepSize;
			this.y = this.y - stepSize;
			break;
		case 68:
			//d
			this.x = this.x + stepSize;
			break;
		case 67:
			//c
			this.x = this.x + stepSize;
			this.y = this.y + stepSize;
			break;
		case 83:
			//s
			this.y = this.y + stepSize;
			break;
		case 90:
			//z
			this.x = this.x - stepSize;
			this.y = this.y + stepSize;
			break;
		case 65:
			//a
			this.x = this.x - stepSize;
			break;
		case 81:
			//q
			this.x = this.x - stepSize;
			this.y = this.y - stepSize;
			break;
	    }

	    //end move
	    if(Math.abs(this.x - this.newX) < 3 && Math.abs(this.y - this.newY) < 3){
		this.x = this.newX;
		this.y = this.newY;
		this.newX = -100;
		this.newY = -100;
		this.nodeIndex = this.newNodeIndex;
		moveFlag = false;
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
	moveFlag = true;
    }
}

init();
boy = new person(nodeObjects[6].x, nodeObjects[6].y, 6, true, 5);

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
    drawWorld();
    drawBoy(boy.x, boy.y, boy.radius);
}



function doKeyDown(evt){
    if(!moveFlag){
	keyCode = evt.keyCode;
	calculateNewPos(evt.keyCode);
    }
}

window.addEventListener('keydown', doKeyDown, true);
window.onload=loop;

