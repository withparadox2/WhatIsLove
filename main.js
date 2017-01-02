window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

var canvas = document.getElementById('canvas'),
    canvasB = document.getElementById('canvasB'), //background canvas, never changes
    ctx = canvas.getContext('2d'),
    ctxB = canvasB.getContext('2d'),
    cw = 525,
    ch = 525,
    nodeObjects = new Array(),
    boy,
    girl,
    moveFlag = false,
    keyCode,
    moveGirOrBoyFlag = false, //false for boy and true for girl
    meetGirlsNum = [false, false, false], //the last one makes function assignment called only once
    rotateDiskOver = false, //if true then reveal the text 
    staticPersons = [],
    girlPassToothFlag = false,
    boyStopFlag = false, //boy stop after saving the girl 
    boyStopOverFlag = false,
    boyStartCrossBridge = false,
    useKeyLFlag = false,
    activateKeyFlag = true, //key event should be disabled when backing in a curve
    gameOverFlag = false,
    blue = '#0000FF',
    red = '#FF0000',
    backgroundColor = '#12867f',
    diskColor = '#FA8258';

function init() {
    canvas.width = cw;
    canvas.height = ch;
    canvasB.width = cw;
    canvasB.height = ch;
    addNodes();
    drawWorld();
    drawStaticPersons();
    boy = new Person(nodeObjects[0].x, nodeObjects[0].y, 0, false, blue, false);
    girl = new Person(nodeObjects[6].x, nodeObjects[6].y, 6, true, red, true);
}

function drawWorld() {
    var xc = 290,
        yc = 80;
    ctxB.strokeStyle = backgroundColor;
    ctxB.beginPath();
    ctxB.moveTo(nodeObjects[0].x, nodeObjects[0].y);
    ctxB.lineTo(nodeObjects[1].x, nodeObjects[1].y);
    ctxB.lineTo(nodeObjects[2].x, nodeObjects[2].y);
    ctxB.lineTo(nodeObjects[3].x, nodeObjects[3].y);
    ctxB.lineTo(nodeObjects[4].x, nodeObjects[4].y);

    ctxB.moveTo(nodeObjects[6].x, nodeObjects[6].y);
    ctxB.lineTo(nodeObjects[7].x, nodeObjects[7].y);
    ctxB.lineTo(nodeObjects[8].x, nodeObjects[8].y);
    ctxB.lineTo(nodeObjects[10].x, nodeObjects[10].y);
    ctxB.lineTo(nodeObjects[11].x, nodeObjects[11].y);
    ctxB.lineTo(nodeObjects[12].x, nodeObjects[12].y);
    ctxB.lineTo(nodeObjects[13].x, nodeObjects[13].y);
    ctxB.lineTo(nodeObjects[14].x, nodeObjects[14].y);
    ctxB.lineTo(nodeObjects[35].x, nodeObjects[35].y);
    ctxB.lineTo(nodeObjects[36].x, nodeObjects[36].y);

    ctxB.moveTo(nodeObjects[15].x, nodeObjects[15].y);
    ctxB.lineTo(nodeObjects[16].x, nodeObjects[16].y);
    ctxB.lineTo(nodeObjects[17].x, nodeObjects[17].y);
    ctxB.lineTo(nodeObjects[41].x, nodeObjects[41].y);
    ctxB.lineTo(nodeObjects[18].x, nodeObjects[18].y);
    ctxB.lineTo(nodeObjects[19].x, nodeObjects[19].y);
    ctxB.lineTo(nodeObjects[0].x, nodeObjects[0].y);
    ctxB.lineTo(nodeObjects[37].x, nodeObjects[37].y);

    ctxB.moveTo(nodeObjects[9].x, nodeObjects[9].y);
    ctxB.lineTo(nodeObjects[24].x, nodeObjects[24].y);
    ctxB.lineTo(nodeObjects[25].x, nodeObjects[25].y);
    ctxB.lineTo(nodeObjects[27].x, nodeObjects[27].y);
    ctxB.lineTo(nodeObjects[28].x, nodeObjects[28].y);

    ctxB.moveTo(nodeObjects[0].x, nodeObjects[0].y);
    ctxB.lineTo(nodeObjects[29].x, nodeObjects[29].y);
    ctxB.lineTo(nodeObjects[30].x, nodeObjects[30].y);
    ctxB.lineTo(nodeObjects[43].x, nodeObjects[43].y);

    ctxB.moveTo(nodeObjects[44].x, nodeObjects[44].y);
    ctxB.lineTo(nodeObjects[31].x, nodeObjects[31].y);
    ctxB.lineTo(nodeObjects[32].x, nodeObjects[32].y);
    ctxB.lineTo(nodeObjects[33].x, nodeObjects[33].y);
    ctxB.lineTo(nodeObjects[34].x, nodeObjects[34].y);

    ctxB.moveTo(nodeObjects[19].x, nodeObjects[19].y);
    ctxB.lineTo(nodeObjects[38].x, nodeObjects[38].y);
    ctxB.lineTo(nodeObjects[17].x, nodeObjects[17].y);

    ctxB.moveTo(nodeObjects[1].x, nodeObjects[1].y);
    ctxB.lineTo(nodeObjects[20].x, nodeObjects[20].y);
    ctxB.lineTo(nodeObjects[39].x, nodeObjects[39].y);

    ctxB.moveTo(nodeObjects[20].x, nodeObjects[20].y);
    ctxB.lineTo(nodeObjects[22].x, nodeObjects[22].y);
    ctxB.lineTo(nodeObjects[40].x, nodeObjects[40].y);
    ctxB.stroke();
}

function node(xPos, yPos, up, upRight, right, rightDown, down, downLeft, left, leftUp) {
    this.x = xPos;
    this.y = yPos;
    this.keyDirection = [up, upRight, right, rightDown, down, downLeft, left, leftUp];
}

function addNodes() {
    nodeObjects.push(new node(290, 80, -1, 19, -1, -1, 37, 29, -1, 1));
    nodeObjects.push(new node(230, 20, -1, -1, -1, 0, 20, -1, 2, -1));
    nodeObjects.push(new node(150, 20, -1, -1, 1, -1, -1, 3, -1, -1));
    nodeObjects.push(new node(70, 100, -1, 2, -1, -1, 4, -1, -1, -1));
    nodeObjects.push(new node(70, 110, 3, -1, -1, -1, -1, -1, -1, -1));
    nodeObjects.push(new node(70, 230, -1, -1, -1, -1, -1, -1, -1, -1));
    nodeObjects.push(new node(70, 240, -1, -1, 7, -1, -1, -1, -1, -1));
    nodeObjects.push(new node(150, 240, -1, -1, -1, -1, 8, -1, 6, -1));
    nodeObjects.push(new node(150, 320, 7, -1, -1, 9, -1, -1, -1, -1));
    nodeObjects.push(new node(180, 350, -1, 24, -1, 10, -1, -1, -1, 8));
    nodeObjects.push(new node(290, 460, -1, 11, -1, -1, -1, -1, -1, 9));
    nodeObjects.push(new node(350, 400, 12, -1, -1, -1, -1, 10, -1, -1));
    nodeObjects.push(new node(350, 350, -1, -1, 13, -1, 11, -1, -1, -1));
    nodeObjects.push(new node(400, 350, -1, 42, -1, -1, -1, -1, 12, -1));
    nodeObjects.push(new node(470, 280, -1, -1, -1, -1, -1, 42, -1, 26));
    nodeObjects.push(new node(477, 273, -1, 16, -1, -1, -1, -1, -1, -1));
    nodeObjects.push(new node(510, 240, 17, -1, -1, -1, -1, 15, -1, -1));
    nodeObjects.push(new node(510, 100, -1, -1, -1, -1, 16, -1, 38, 41));
    nodeObjects.push(new node(430, 20, -1, -1, -1, 41, -1, -1, 19, -1));
    nodeObjects.push(new node(350, 20, -1, -1, 18, 38, -1, 0, -1, -1));
    nodeObjects.push(new node(230, 50, 1, -1, -1, -1, 22, -1, 21, -1));
    nodeObjects.push(new node(150, 50, -1, -1, 20, -1, -1, -1, -1, -1));
    nodeObjects.push(new node(230, 80, 20, -1, -1, -1, -1, -1, 23, -1));
    nodeObjects.push(new node(150, 80, -1, -1, 22, -1, -1, -1, -1, -1));
    nodeObjects.push(new node(230, 300, -1, -1, 25, -1, -1, 9, -1, -1));
    nodeObjects.push(new node(320, 300, -1, 26, -1, -1, -1, -1, 24, -1));
    nodeObjects.push(new node(405, 215, -1, 27, -1, 14, -1, 25, -1, 35));
    nodeObjects.push(new node(430, 190, 28, -1, -1, -1, -1, 26, -1, -1));
    nodeObjects.push(new node(430, 110, -1, -1, -1, -1, 27, -1, -1, -1));
    nodeObjects.push(new node(230, 140, -1, 0, -1, -1, -1, -1, 30, -1));
    nodeObjects.push(new node(150, 140, -1, -1, 29, -1, 31, -1, -1, -1));
    nodeObjects.push(new node(150, 230, 30, -1, 32, -1, -1, -1, -1, -1));
    nodeObjects.push(new node(190, 230, -1, 33, -1, -1, -1, -1, 31, -1));
    nodeObjects.push(new node(240, 180, -1, -1, 34, -1, -1, 32, -1, -1));
    nodeObjects.push(new node(280, 180, -1, -1, -1, -1, -1, -1, 33, -1));
    nodeObjects.push(new node(370, 180, -1, -1, -1, 26, -1, -1, 36, -1));
    nodeObjects.push(new node(300, 180, -1, -1, 35, -1, -1, -1, -1, -1));
    nodeObjects.push(new node(290, 170, 0, -1, -1, -1, -1, -1, -1, -1));
    nodeObjects.push(new node(430, 100, -1, -1, 17, -1, -1, -1, -1, 19));

    nodeObjects.push(new node(140, 50, -1, -1, -1, -1, -1, -1, -1, -1)); //39  left one of point 21
    nodeObjects.push(new node(140, 80, -1, -1, -1, -1, -1, -1, -1, -1)); //40  left one of point 23
    nodeObjects.push(new node(470, 60, -1, -1, -1, -1, -1, -1, -1, -1)); //41  betweent point 18 and 17
    nodeObjects.push(new node(432, 318, -1, 14, -1, -1, -1, 13, -1, -1)); //42  betweent point 13 and 14
    nodeObjects.push(new node(150, 160, -1, -1, -1, -1, -1, -1, -1, -1)); //43  betweent point 30 and 31
    nodeObjects.push(new node(150, 210, -1, -1, -1, -1, -1, -1, -1, -1)); //44  betweent point 30 and 31
    nodeObjects.push(new node(150, 185, -1, -1, -1, -1, -1, -1, -1, -1)); //45  betweent point 30 and 31
}

function backToLastPoint(that) {
    if (that.nodeIndex == 21 || that.nodeIndex == 23 || that.nodeIndex == 41 || that.nodeIndex == 25 || that.nodeIndex == 37 || (that.nodeIndex == 42 && !girlPassToothFlag)) {
        drawBackCurve = drawDeath(that);
    }
}

function detecEndOfGame() {
    if (boy.nodeIndex == 34 && girl.nodeIndex == 36) {
        gameOverFlag = true;
    }
}

function Person(xPos, yPos, nodeIndex, girlOrBoy, color, freezeFlag) {
    this.x = xPos;
    this.y = yPos;
    this.nodeIndex = nodeIndex;
    this.girlOrBoy = girlOrBoy; //false boy true girl
    this.radius = 5;
    this.newNodeIndex = nodeIndex;
    this.newX = -100;
    this.newY = -100;
    this.color = color;
    this.freezeFlag = freezeFlag;
    this.stepSize = 2;
}

function abs(x) {
    return (x < 0) ? (~x + 1) : x;
}

Person.prototype.updatePos = function() {
    var nodeIndexTemp,
        that = this;
    if (this.girlOrBoy === moveGirOrBoyFlag) {
        switch (keyCode) {
            case 87:
                //w
                this.y = this.y - this.stepSize;
                break;
            case 69:
                //e
                this.x = this.x + this.stepSize;
                this.y = this.y - this.stepSize;
                break;
            case 68:
                //d
                this.x = this.x + this.stepSize;
                break;
            case 67:
                //c
                this.x = this.x + this.stepSize;
                this.y = this.y + this.stepSize;
                break;
            case 83:
                //s
                this.y = this.y + this.stepSize;
                break;
            case 90:
                //z
                this.x = this.x - this.stepSize;
                this.y = this.y + this.stepSize;
                break;
            case 65:
                //a
                this.x = this.x - this.stepSize;
                break;
            case 81:
                //q
                this.x = this.x - this.stepSize;
                this.y = this.y - this.stepSize;
                break;
        }
        //end move
        if (abs(this.x - this.newX) < 3 && abs(this.y - this.newY) < 3) {
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
            if (girlPassToothFlag) drawTooth = function() {};
            if (boyStopFlag && girl.nodeIndex === 28 && !boyStopOverFlag) {
                boyStopOverFlag = true;
            }
            if (girlPassToothFlag && girl.nodeIndex === 7) {
                Bridge.bridgeRotateSpeed = 50;
                drawCircle = getDrawCircle();
            } else {
                Bridge.bridgeRotateSpeed = 15;
                drawCircle = function() {}
            }
        }
    }
}


function StaticPerson(x, y, girlOrBoy) {
    this.x = x;
    this.y = y;
    this.radius = 5;
    this.color = girlOrBoy ? blue : red;
}

function drawDeath(person, endX, endY) {
    var deathTime = 0,
        deathX = person.x,
        deathY = person.y;
    if (typeof endX === 'undefined') {
        endX = nodeObjects[person.newNodeIndex].x;
        endY = nodeObjects[person.newNodeIndex].y;
    }
    return function() {
        if (Math.abs(person.x - endX) > 3) {
            person.x = deathX + (endX - deathX) / 100 * deathTime;
            person.y = deathY + (endY - deathY) / 100 * deathTime + 15 * Math.sin(person.x / 5);
            deathTime++;
            activateKeyFlag = false;
        } else {
            person.x = endX;
            person.y = endY;
            person.nodeIndex = person.newNodeIndex;
            drawBackCurve = function() {};
            if (!girlPassToothFlag) drawTooth = function() {};
            activateKeyFlag = true;
        }
    }
}

function getDrawTooth() {
    var opacity = 1,
        time = 0;
    return function(x, y) {
        ctx.save();
        ctx.strokeStyle = 'rgba(18, 134, 127, ' + opacity + ')';
        ctx.translate(x, y);
        ctx.rotate(Math.PI / 4);
        ctx.moveTo(-20, 0);
        ctx.lineTo(20, 0);
        for (var i = 0; i < 9; i++) {
            ctx.moveTo(-20 + i * 5, 0);
            ctx.lineTo(-20 + i * 5, 5);
        }
        if (time > 10) {
            ctx.stroke();
        }
        ctx.restore();
        time++;
    }
}


var Bridge = {
    time: 0,
    bridgeRotateSpeed: 15,
    drawBridge: function() {
        var width = Math.abs(40 * Math.sin(Math.PI / this.bridgeRotateSpeed * this.time));
        ctx.strokeStyle = backgroundColor;
        for (var i = 0; i < 5; i++) {
            ctx.strokeRect(150 - width / 2, 160 + i * 10, width, 10);
        }
        this.time++;
        if (boyStartCrossBridge && this.time % this.bridgeRotateSpeed === 0) {
            if (boy.y > 160 && boy.y < 210) {
                moveFlag = false;
                boy.newNodeIndex = boy.nodeIndex;
                drawBackCurve = drawDeath(boy, nodeObjects[boy.nodeIndex].x, nodeObjects[boy.nodeIndex].y)
            }
        }
    }
}

function revealRotateLine() {
    if (boy.nodeIndex === 21) {
        meetGirlsNum[0] = true;
    }
    if (boy.nodeIndex === 23) {
        meetGirlsNum[1] = true;
    }
    if (meetGirlsNum[0] && meetGirlsNum[1] && !meetGirlsNum[2]) {
        drawRotateLine = getRotateLine();
        meetGirlsNum[2] = true;
    }
}

function drawTooth() {}

function drawBackCurve() {}

function drawRotateLine() {}

function drawCircle() {}


function getDrawCircle() {
    var time = 0;
    return function() {
        ctx.strokeStyle = red;
        ctx.beginPath();
        ctx.arc(nodeObjects[7].x, nodeObjects[7].y, time, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.fillStyle = 'rgba(238,130,238,0.2)';
        ctx.arc(nodeObjects[7].x, nodeObjects[7].y, time, 0, Math.PI * 2, true);
        ctx.fill();
        time++;
        if (time > 80) time = 0;
    }
}

function getRotateLine() {
    var time = 0,
        opacity = 0,
        rotateDiskFlag = false;
    rotateDiskOver = false;
    return function() {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(18, 134, 127, ' + opacity + ' )';
        ctx.translate(70, 175);
        ctx.rotate(time / 500 * Math.PI);
        ctx.moveTo(0, -55);
        ctx.lineTo(0, 55)
        ctx.stroke();
        ctx.closePath();
        if (!rotateDiskOver) {
            if (time === 0 && boy.nodeIndex === 4) {
                rotateDiskFlag = true;
                boy.freezeFlag = true;
            }
            if (rotateDiskFlag) {
                if (time === 999) {
                    boy.freezeFlag = false;
                    girl.freezeFlag = false;
                    useKeyLFlag = true;
                    rotateDiskOver = true;
                }
                ctx.beginPath();
                ctx.fillStyle = blue;
                ctx.arc(0, -55, 5, 0, Math.PI * 2, true);
                ctx.fill();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = red;
                ctx.arc(0, 55, 5, 0, Math.PI * 2, true);
                ctx.fill();
                ctx.closePath();
            }
        }
        ctx.restore();
        if (time < 1000) {
            time++;
        } else {
            time = 0;
        }
        opacity = opacity + 0.004;
    }
}

var drawTextFlag = false;

function drawText() {
    if (rotateDiskOver) {
        ctx.fillStyle = moveGirOrBoyFlag ? red : blue;
        if (!drawTextFlag) {
            ctxB.fillStyle = backgroundColor;
            ctxB.font = "16px";
            ctxB.fillText("按 L 切换控制：", 10, 450);
            drawTextFlag = true;
        }
        ctx.beginPath();
        ctx.arc(95, 447, 5, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.closePath();
    }
}

var overTime = 0;

function drawOverText() {
    ctxB.fillStyle = diskColor;
    ctxB.font = '60px 仿宋';
    ctxB.fillText("愿有情人终成眷属！", 10, 250);
}

function calculateNewPos(keyCode, person) {
    var getIndex,
        keyDirectionCode;
    switch (keyCode) {
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
        case 76: //L change the control of role
            if (useKeyLFlag) moveGirOrBoyFlag = !moveGirOrBoyFlag;
            break;
        default:
            return;
    }
    getIndex = nodeObjects[person.nodeIndex].keyDirection[keyDirectionCode];
    if (getIndex !== -1 && activateKeyFlag) {
        person.newNodeIndex = getIndex;
        person.newX = nodeObjects[getIndex].x;
        person.newY = nodeObjects[getIndex].y;
        if (!person.freezeFlag) moveFlag = true;
        if (!girlPassToothFlag) {
            if (person.nodeIndex === 13 && person.newNodeIndex === 42) {
                drawTooth = getDrawTooth();
                if (boy.nodeIndex === 15) {
                    person.stepSize = 4;
                    getIndex = 14;
                    girlPassToothFlag = true;
                }
            }
        } else {
            person.stepSize = 2;
            if (person.nodeIndex === 14 && person.newNodeIndex === 42) {
                getIndex = 13;
                if (boy.nodeIndex === 15) {
                    person.stepSize = 0.5;
                }
            }
            if (person.nodeIndex === 13 && person.newNodeIndex === 42) {
                getIndex = 14;
                if (boy.nodeIndex === 15) {
                    person.stepSize = 4;
                }
            }
        }

        if (girlPassToothFlag && !boyStopOverFlag && person.nodeIndex === 38) {
            boyStopFlag = true;
            moveFlag = false;
        }

        if (boy.nodeIndex === 30 && boy.newNodeIndex === 31 || boy.nodeIndex === 31 && boy.newNodeIndex === 30) {
            boyStartCrossBridge = true;
        } else {
            boyStartCrossBridge = false;
        }
        person.newX = nodeObjects[getIndex].x;
        person.newY = nodeObjects[getIndex].y;
        person.newNodeIndex = getIndex;
    }
}

function drawStaticPersons() {
    staticPersons.push(new StaticPerson(nodeObjects[41].x, nodeObjects[41].y, false)); //girl
    staticPersons.push(new StaticPerson(nodeObjects[39].x, nodeObjects[39].y, false)); //girl
    staticPersons.push(new StaticPerson(nodeObjects[40].x, nodeObjects[40].y, false)); //girl
    staticPersons.push(new StaticPerson(nodeObjects[25].x, nodeObjects[25].y, true)); //boy
    for (var i = 0; i < 4; i++) {
        drawPerson(staticPersons[i], ctxB);
    }
}

function drawPerson(person, ctx) {
    ctx.fillStyle = person.color;
    ctx.beginPath();
    ctx.arc(person.x, person.y, person.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

function loop() {
    requestAnimFrame(loop);
    ctx.clearRect(0, 0, 525, 525);
    if (!gameOverFlag) {
        if (moveFlag) {
            boy.updatePos();
            girl.updatePos();
        }
        drawPerson(boy, ctx);
        drawPerson(girl, ctx);
        drawRotateLine();
        drawText();
        drawBackCurve();
        drawTooth(440, 310);
        Bridge.drawBridge();
        drawCircle();
    } else {
        ctxB.clearRect(0, 0, 525, 525);
        drawOverText();
    }
}

function doKeyDown(evt) {
    if (!moveFlag) {
        keyCode = evt.keyCode;
        if (moveGirOrBoyFlag) {
            console.log('click girl');
            calculateNewPos(evt.keyCode, girl);
        } else {
            console.log('click boy');
            calculateNewPos(evt.keyCode, boy);
        }
    }
}

window.addEventListener('keydown', doKeyDown, true);
window.onload = loop;
init();
