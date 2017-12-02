var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var game = {};

//----------------------------------------------------------------------------------------
//---------------------------------------------------------------------------DEFINITIONS--
//----------------------------------------------------------------------------------------

function Breakout() {
    game.mode = 'ready';
    game.level = 1;
    game.lives = 3;
    game.score = 0;
    game.blocksDestroyed = 0;
    game.counter = 0;
    game.mouseX = 335;
    game.refresh = 50;
    window.addEventListener('keyup', function (e) { keyListener(e) }, false);
    window.addEventListener('mousemove', function (e) { game.mouseX = e.clientX; }, false);
    game.timer = setInterval(function () { draw(); update() }, game.refresh);
}

function Brick(x,y,h) {
    xCoord = x;
    yCoord = y;
    width = 50;
    height = 20;
    color = '#ffffff';
    health = h;
    brick = [xCoord,yCoord,width,height,color,health];
    return brick;
}

//----------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------INPUT--
//----------------------------------------------------------------------------------------

function keyListener(e) {
    switch (e.keyCode) {
        case 13: //PLAY & CONTINUE (enter)
            if (game.mode == 'play') { break; }
            if (game.mode == 'pause') {
                Continue();
            }
            else {
                play();
            }
            break;
        case 32: //PAUSE (space bar)
            if (game.mode == 'play') {
                pause();
            }
            break;
        default:
            break;
    }
}

function play() {
    game.mode = 'play';
    document.getElementById('playButton').style.display = 'none';
    document.getElementById('pauseButton').style.display = 'block';
    document.getElementById('playPause').style.display = 'none';
    document.getElementById('canvas').style.cursor = 'none';
}

function pause() {
    game.mode = 'pause';
    document.getElementById('pauseButton').style.display = 'none';
    document.getElementById('continueButton').style.display = 'block';
    document.getElementById('continueModal').style.display = 'block';
    document.getElementById('canvas').style.cursor = 'default';
}

function Continue() {
    game.mode = 'play';
    document.getElementById('pauseButton').style.display = 'block';
    document.getElementById('continueButton').style.display = 'none';
    document.getElementById('continueModal').style.display = 'none';
    document.getElementById('canvas').style.cursor = 'none';
}

function setStyle(id, style, value) {
    document.getElementById(id).style[style] = value;
}

//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------DRAW--
//----------------------------------------------------------------------------------------

function draw() {
    switch (game.mode) {
        case 'ready':
            drawScreen();
            drawPaddle();
            break;
        case 'play':
            game.counter += 1;
            drawScreen();
            drawPaddle();
            break;
        case 'pause':
            break;
    }
}

function drawScreen() {
    ctx.fillStyle = "#223322";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var gradient = ctx.createLinearGradient(0, 400, 0, 490);
    gradient.addColorStop(0, '#223322');
    gradient.addColorStop(1, '#101010');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 400, 785, 90);
}

function drawPaddle() {
    var x = game.mouseX - canvas.getBoundingClientRect().left - 40;
    if (x <= 0) { x = 0 };
    if (x >= 670) { x = 670 };
    if (game.mode == 'ready') { x = 335; };
    ctx.fillStyle = "#dcdfdc";
    ctx.fillRect(x, 455, 80, 20);
}

//----------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------UPDATE--
//----------------------------------------------------------------------------------------

function update() {
    switch (game.mode) {
        case 'play':
            break;
    }
    upadateScoreBoard();
}

function upadateScoreBoard() {
    document.getElementById("lives").innerHTML = game.mode;
    document.getElementById("score").innerHTML = game.counter;
    document.getElementById("blocksDestroyed").innerHTML = game.blocksDestroyed;
    document.getElementById("time").innerHTML = timer(game.count);
}

//----------------------------------------------------------------------------------------
//---------------------------------------------------------------------------SUBROUTINES--
//----------------------------------------------------------------------------------------

function timer(count) {
    var s = count / 60;
    var m = s / 60;
    var h = m / 60;
}