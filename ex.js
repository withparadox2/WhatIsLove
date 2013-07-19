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
    girl;

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
    this.x         = xPos;
    this.y         = yPos;
    this.keyDirection = [up, upRight, right, rightDown, down, downLeft, left, leftUp];
}

function addNodes(){
    nodeObjects.push(new node(290, 80, -1, 9, -1, -1, -1, -1, -1, 1));
    nodeObjects.push(new node(230, 20, -1, -1, -1, 0, -1, -1, 2, -1));
    nodeObjects.push(new node(150, 20, -1, -1, 1, -1, -1, 3, -1, -1));
} 

function person(xPos, yPos, nodeIndex, girlOrBoy, radius){
    this.x = xPos;
    this.y = yPos;
    this.nodeIndex = nodeIndex;
    this.girlOrBoy = girlOrBoy;
    this.radius = radius;
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
    drawBoy(boy.x, boy.y, boy.radius);
    drawWorld();
    calculatePos(1);
}

function calculatePos(keyDirectionCode){
    var nextNodeIndex,
	getIndex,
	newXpos,
	newYpos;
    getIndex = nodeObjects[boy.nodeIndex].keyDirection[keyDirectionCode];
    if(getIndex !== -1){
	newXpos = nodeObjects[getIndex].x;
	newYpos = nodeObjects[getIndex].y;
    }
}
/*function doKeyDown(evt){
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
window.addEventListener('keydown', doKeyDown, true);
window.addEventListener('keyup', doKeyUp, true);
*/
window.onload=loop;

