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
    keyCode,
    moveGirOrBoyFlag = false,//false for boy and true for girl
    meetGirlsNum = [false, false, false],//the last one makes function assign called only once
    rotateDiskOver = false,
    staticPersons = [],
    girlPassToothFlag = false;

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
    ctx.lineTo(nodeObjects[41].x,  nodeObjects[41].y);
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
    ctx.lineTo(nodeObjects[39].x,  nodeObjects[39].y);
    
    ctx.moveTo(nodeObjects[20].x,  nodeObjects[20].y);
    ctx.lineTo(nodeObjects[22].x,  nodeObjects[22].y);
    ctx.lineTo(nodeObjects[40].x,  nodeObjects[40].y);
    ctx.stroke();
}

function node(xPos, yPos, up, upRight, right, rightDown, down, downLeft, left, leftUp){
    this.x = xPos;
    this.y = yPos;
    this.keyDirection = [up, upRight, right, rightDown, down, downLeft, left, leftUp];
}


function addNodes(){
    nodeObjects.push(new node(290,  80, -1, 19, -1, -1, 37, 29, -1,  1));
    nodeObjects.push(new node(230,  20, -1, -1, -1,  0, 20, -1,  2, -1));
    nodeObjects.push(new node(150,  20, -1, -1,  1, -1, -1,  3, -1, -1));
    nodeObjects.push(new node( 70, 100, -1,  2, -1, -1,  4, -1, -1, -1));
    nodeObjects.push(new node( 70, 110,  3, -1, -1, -1, -1, -1, -1, -1));
    nodeObjects.push(new node( 70, 230, -1, -1, -1, -1, -1, -1, -1, -1));
    nodeObjects.push(new node( 70, 240, -1, -1,  7, -1, -1, -1, -1, -1));
    nodeObjects.push(new node(150, 240, -1, -1, -1, -1,  8, -1,  6, -1));
    nodeObjects.push(new node(150, 320,  7, -1, -1,  9, -1, -1, -1, -1));
    nodeObjects.push(new node(180, 350, -1, 24, -1, 10, -1, -1, -1,  8));
    nodeObjects.push(new node(290, 460, -1, 11, -1, -1, -1, -1, -1,  9));
    nodeObjects.push(new node(350, 400, 12, -1, -1, -1, -1, 10, -1, -1));
    nodeObjects.push(new node(350, 350, -1, -1, 13, -1, 11, -1, -1, -1));
    nodeObjects.push(new node(400, 350, -1, 14, -1, -1, -1, -1, 12, -1));
    nodeObjects.push(new node(470, 280, -1, -1, -1, -1, -1, 13, -1, 26));
    nodeObjects.push(new node(477, 273, -1, 16, -1, -1, -1, -1, -1, -1));
    nodeObjects.push(new node(510, 240, 17, -1, -1, -1, -1, 15, -1, -1));
    nodeObjects.push(new node(510, 100, -1, -1, -1, -1, 16, -1, 38, 41));
    nodeObjects.push(new node(430,  20, -1, -1, -1, 41, -1, -1, 19, -1));
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


    nodeObjects.push(new node(140,  50, -1, -1, -1, -1, -1, -1, -1, -1));//39  left one of point 21
    nodeObjects.push(new node(140,  80, -1, -1, -1, -1, -1, -1, -1, -1));//40  left one of point 23
    nodeObjects.push(new node(470,  60, -1, -1, -1, -1, -1, -1, -1, -1));//41  betweent point 18 and 17
    
} 

function backToLastPoint(that){
    if(that.nodeIndex == 21 || that.nodeIndex == 23 || that.nodeIndex == 41 || that.nodeIndex == 25 || that.nodeIndex == 37){
	drawBackCurve = drawDeath(that);
	//that.nodeIndex = that.newNodeIndex;
	//that.x = nodeObjects[that.nodeIndex].x;
	//that.y = nodeObjects[that.nodeIndex].y;
    }
}

function detecEndOfGame(){
    if(boy.nodeIndex == 34 && girl.nodeIndex == 36){
	alert("愿有情人终成眷属！");
    }
}

function Person(xPos, yPos, nodeIndex, girlOrBoy, color, freezeFlag){
    this.x = xPos;
    this.y = yPos;
    this.nodeIndex = nodeIndex;
    this.girlOrBoy = girlOrBoy;//false boy true girl
    this.radius = 5;
    this.newNodeIndex = nodeIndex;
    this.newX = -100;
    this.newY = -100;
    this.color = color;
    this.freezeFlag = freezeFlag;
    this.stepSize = 2;
    this.updatePos = function(){
	var stepSize = this.stepSize,
	    nodeIndexTemp,
	    that = this;
	if(moveFlag && (girlOrBoy === moveGirOrBoyFlag)){
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
		nodeIndexTemp = this.nodeIndex;
		this.nodeIndex = this.newNodeIndex;
		this.newNodeIndex = nodeIndexTemp;
		moveFlag = false;
		revealRotateLine();
		backToLastPoint(that);
		detecEndOfGame();
	    }
	}
    }
}


function StaticPerson(x, y, girlOrBoy){
    this.x = x;
    this.y = y;
    this.radius = 5;
    if(!girlOrBoy){
	this.color = "#FF0000";
    }else{
	this.color = "#0000FF";
    }
}

function drawDeath(person){
var deathTime = 0,
    deathX,
    deathY,
    endX,
    endY;
    deathX = person.x;
    deathY = person.y;
    endX = nodeObjects[person.newNodeIndex].x;
    endY = nodeObjects[person.newNodeIndex].y;
    return function(){
	if(Math.abs(person.x - endX) > 3){
	    person.x = deathX + (endX - deathX) / 100 * deathTime; 
	    person.y = deathY + (endY - deathY) / 100 * deathTime + 15 * Math.sin(person.x / 5); 
	    deathTime++;
	}else{
	    person.x = endX;
	    person.y = endY;
	    person.nodeIndex = person.newNodeIndex;
	    drawBackCurve = function(){};
	}
    }
    
}

function getDrawTooth(){
    var opacity = 1,
	time = 0;
    return function(x, y){
	ctx.save();
	ctx.strokeStyle = 'rgba(0, 0, 0,' + opacity + ')';
	ctx.translate(x ,y);
	ctx.rotate(Math.PI / 4);
	ctx.moveTo(-20, 0);
	ctx.lineTo(20, 0);
	for(var i = 0; i < 9; i++){
	    ctx.moveTo(-20 + i * 5, 0);
	    ctx.lineTo(-20 + i * 5, 5);

	}
	if(time > 10){
	    ctx.stroke();
	}
	ctx.restore();
	time++;
    }
}

function drawTooth(){

}
function drawBackCurve(){

}

function drawRoateLineFinal(){
    
}

function revealRotateLine(){
    if(boy.nodeIndex === 21){
	meetGirlsNum[0] = true;
    }
    if(boy.nodeIndex === 23){
	meetGirlsNum[1] = true;
    }
    if(meetGirlsNum[0] && meetGirlsNum[1] && !meetGirlsNum[2]){
	drawRoateLineFinal = drawRotateLine();	
	meetGirlsNum[2] = true;
    }
}

function drawRotateLine(){
    var time = 0,
	opacity = 0,
	rotateDiskFlag = false;
    rotateDiskOver = false;
    return function(){
	ctx.save();
	ctx.beginPath();
	ctx.strokeStyle='rgba(0, 0, 0,' + opacity + ' )';
	ctx.translate(70, 175);
	ctx.rotate(time / 500 * Math.PI);
	ctx.moveTo(0, -55);
	ctx.lineTo(0, 55)
	ctx.stroke();
	ctx.closePath();
	if(!rotateDiskOver){
	    if(time === 0 && boy.nodeIndex === 4){
		rotateDiskFlag = true;
		boy.freezeFlag = true;
	    }
	    if(rotateDiskFlag){
		if(time === 999){
		    boy.freezeFlag = false;
		    girl.freezeFlag = false;
		    rotateDiskOver = true;
		}
		ctx.beginPath();
		ctx.fillStyle = "#0000FF";
		ctx.arc(0, -55, 5, 0, Math.PI*2, true);
		ctx.fill();
		ctx.closePath();
		ctx.beginPath();
		ctx.fillStyle = "#FF0000";
		ctx.arc(0, 55, 5, 0, Math.PI*2, true);
		ctx.fill();
		ctx.closePath();
	    }
	}
	ctx.restore();
	if(time < 1000){
	    time++;
	}else{
	    time = 0;
	}
	opacity = opacity + 0.004;
    }
}

function drawText(){
    if(rotateDiskOver){
	if(!moveGirOrBoyFlag){
	    ctx.fillStyle = "#0000FF";
	}else{
	    ctx.fillStyle = "#FF0000";
	}
	ctx.font="14px";
	ctx.fillText("按L切换控制：", 10, 450);	
	ctx.beginPath();
	ctx.arc(95, 447, 5, 0, Math.PI*2, true);
	ctx.fill();
	ctx.closePath();
    }
}

function calculateNewPos(keyCode, person){
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
	case 76://L change the control of role
	    moveGirOrBoyFlag = !moveGirOrBoyFlag;
	    break;
    }
    getIndex = nodeObjects[person.nodeIndex].keyDirection[keyDirectionCode];
    if(getIndex !== -1){
	person.newX = nodeObjects[getIndex].x;
	person.newY = nodeObjects[getIndex].y;
	person.newNodeIndex = getIndex;
	if(!person.freezeFlag)	moveFlag = true;
	if(person.girlOrBoy && person.nodeIndex === 13 && person.newNodeIndex === 14 && boy.nodeIndex === 15){
	    person.stepSize = 10;
	}else{
	    person.stepSize = 2;
	}
	if(person.girlOrBoy && person.nodeIndex === 13 && person.newNodeIndex === 14){
	    drawTooth = getDrawTooth();
	}
    }
}

init();
boy = new Person(nodeObjects[0].x, nodeObjects[0].y, 0, false, "#0000FF", false);
girl = new Person(nodeObjects[13].x, nodeObjects[13].y, 13, true, "#FF0000", false);
staticPersons.push(new StaticPerson(nodeObjects[41].x, nodeObjects[41].y, false));//girl
staticPersons.push(new StaticPerson(nodeObjects[39].x, nodeObjects[39].y, false));//girl
staticPersons.push(new StaticPerson(nodeObjects[40].x, nodeObjects[40].y, false));//girl
staticPersons.push(new StaticPerson(nodeObjects[25].x, nodeObjects[25].y, true));//boy

function drawStaticPersons(){
    var l = staticPersons.length;
    for(var i = 0; i < l; i++){
	drawPerson(staticPersons[i]);
    }
}

function drawPerson(person){
    ctx.fillStyle = person.color;
    ctx.beginPath();
    ctx.arc(person.x, person.y, person.radius, 0, Math.PI*2, true);
    ctx.closePath();    
    ctx.fill();
}


function loop() {
    requestAnimFrame( loop );
    ctx.clearRect(0, 0, 525, 525);
    if(moveFlag){
	boy.updatePos();
	girl.updatePos();
    }
    drawWorld();
    drawPerson(boy);
    drawPerson(girl);
    drawRoateLineFinal();
    drawText();
    drawStaticPersons();
    drawBackCurve();
    drawTooth(440, 310);
}

function doKeyDown(evt){
    if(!moveFlag){
	keyCode = evt.keyCode;
	if(moveGirOrBoyFlag){
	    console.log('click girl');
	    calculateNewPos(evt.keyCode, girl);
	}else{
	    console.log('click boy');
	    calculateNewPos(evt.keyCode, boy);
	}
    }
}

window.addEventListener('keydown', doKeyDown, true);
window.onload=loop;

