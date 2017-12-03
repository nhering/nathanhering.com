//----------------------------------------------------------------------------------------
//---------------------------------------------------------------------------DEFINITIONS--
//----------------------------------------------------------------------------------------

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var game = {};
var paddle = {};
var ball = {};
var bricks = [];

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

//----------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------INPUT--
//----------------------------------------------------------------------------------------

function keyListener(e) {
    switch (e.keyCode) {
        case 13: //PLAY & CONTINUE (enter)
            if (game.mode == 'play') { break; }
            if (game.mode == 'pause') { resume(); }
            else { play(); }
            break;

        case 32: //PAUSE (space bar)
            if (game.mode == 'play') { pause(); }
            break;

        default:
            break;
    }
}

function play() {
    game.mode = 'play';
    document.getElementById('playButton').style.display = 'none';
    document.getElementById('pauseButton').style.display = 'block';
    document.getElementById('continueButton').style.display = 'none';
    document.getElementById('canvas').style.cursor = 'none';
}

function pause() {
    game.mode = 'pause';
    document.getElementById('pauseButton').style.display = 'none';
    document.getElementById('continueButton').style.display = 'block';
    document.getElementById('resumeModal').style.display = 'block';
    document.getElementById('canvas').style.cursor = 'default';
}

function resume() {
    game.mode = 'play';
    document.getElementById('pauseButton').style.display = 'block';
    document.getElementById('continueButton').style.display = 'none';
    document.getElementById('resumeModal').style.display = 'none';
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
            drawBall();
            break;
        case 'play':
            game.counter++;
            drawScreen();
            drawPaddle();
            drawBall();
            break;
        case 'pause':
            break;
    }
}

function drawScreen() {
    ctx.fillStyle = '#223322';
    ctx.fillRect(0, 0, 750, 490);
    var gradient = ctx.createLinearGradient(0, 440, 0, 490);
    gradient.addColorStop(0, '#223322');
    gradient.addColorStop(1, '#101010');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 440, 750, 50);
}

function drawPaddle() {
    paddle.width = 80;
    var x = game.mouseX - canvas.getBoundingClientRect().left - (paddle.width / 2);
    if (x <= 0) { x = 0 };
    if (x >= 670) { x = 670 };
    if (game.mode == 'ready') { x = 335; };
    ctx.fillStyle = '#dcdfdc';
    ctx.fillRect(x, 455, paddle.width, 20);
}

function drawBall() {
    ball.xCoord = 375;
    ball.yCoord = 245;
    ball.radius = 6;
    ctx.beginPath();
    ctx.arc(ball.xCoord, ball.yCoord, ball.radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#dcdfdc';
    ctx.fill();
}

function drawBricks() {

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
    document.getElementById('lives').innerHTML = game.mode;
    document.getElementById('score').innerHTML = game.score;
    document.getElementById('blocksDestroyed').innerHTML = game.blocksDestroyed;
    document.getElementById('time').innerHTML = timer();
}

//----------------------------------------------------------------------------------------
//---------------------------------------------------------------------------SUBROUTINES--
//----------------------------------------------------------------------------------------

function timer() {
    var s = Math.floor((game.counter / (1000 / game.refresh)) % 60);
    var m = Math.floor(((game.counter / (1000 / game.refresh)) / 60) % 60);

    if (s < 10) { second = ('0' + s); }
    else { second = s }

    if (m < 10) { minute = ('0' + m); }
    else { minute = m; }

    return (minute + ':' + second);
}

function makeBrick(x, y, h) {
    var xCoord = x;
    var yCoord = y;
    var width = 50;
    var height = 20;
    var color = '#ffffff';
    var health = h;
    var brick = [xCoord, yCoord, width, height, color, health];
    return brick;
}