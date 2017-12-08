function test(info) {
    document.getElementById('footerBanner').innerHTML = info;
}

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
    game.ball = [375, 245, 7, 0, 2 * Math.PI, '#dcdfdc', 0, 0, 10];//[0]xCoord, [1]yCoord, [2]radius, [3]startAngle, [4]endAngle, [5]color, [6]xVelocity, [7]yVelocity, [8]speed
    game.mode = 'ready';
    game.level = 1;
    game.tries = 3;
    game.score = 0;
    game.bricksDestroyed = 0;
    game.counter = 0;
    game.mouseX = 335;
    game.refresh = 50;
    window.addEventListener('keyup', function (e) { keyListener(e) }, false);
    window.addEventListener('mousemove', function (e) { game.mouseX = e.clientX; }, false);
    game.timer = setInterval(function () { draw(); update() }, game.refresh);
    initializeBricks();
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
    initializeBricks();
    initializeBall();
}

function resume() {
    game.mode = 'play';
    document.getElementById('pauseButton').style.display = 'block';
    document.getElementById('continueButton').style.display = 'none';
    document.getElementById('resumeModal').style.display = 'none';
    document.getElementById('canvas').style.cursor = 'none';
}

function pause() {
    game.mode = 'pause';
    document.getElementById('pauseButton').style.display = 'none';
    document.getElementById('continueButton').style.display = 'block';
    document.getElementById('resumeModal').style.display = 'block';
    document.getElementById('canvas').style.cursor = 'default';
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
            drawBricks();
            break;
        case 'play':
            drawScreen();
            drawPaddle();
            drawBall();
            drawBricks();
            break;
        case 'pause':
            break;
    }
}

function drawScreen() {
    ctx.fillStyle = '#223322';
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    var gradient = ctx.createLinearGradient(0, 455, 0, 490);
    gradient.addColorStop(0, '#223322');
    gradient.addColorStop(0.855, '#101310');
    gradient.addColorStop(1, '#101010');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 455, 750, 35);
}

function drawPaddle() {
    paddle.width = 80;
    var right = canvas.clientWidth - paddle.width;
    var x = game.mouseX - canvas.getBoundingClientRect().left - (paddle.width/2);
    if (x <= 0) { x = 0 };
    if (x >= right) { x = right };
    ctx.fillStyle = '#dcdfdc';
    ctx.fillRect(x, 455, paddle.width, 20);
}

function drawBall(x, y) {
    var b = game.ball;
    ctx.beginPath();
    ctx.arc(b[0], b[1], b[2], b[3], b[4]);
    ctx.fillStyle = b[5];
    ctx.fill();
    //test('x: ' + b[0] + '<br/>y: ' + b[1]);
}

function drawBricks() {
    for (var i = 0; i < bricks.length; i++) {
        ctx.fillStyle = bricks[i][4];
        ctx.fillRect(bricks[i][0], bricks[i][1], bricks[i][2], bricks[i][3]);

        var fontSize = 15;
        var fontFont = "Consolas";
        var message = bricks[i][5];
        var x = bricks[i][0] + (bricks[i][2] / 2) - (fontSize / 5);
        var y = bricks[i][1] + (bricks[i][3] / 2) + (fontSize / 3);
        ctx.fillStyle = 'black';
        ctx.font = fontSize + 'px ' + fontFont;
        ctx.fillText(message, x, y);
    }
}

//----------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------UPDATE--
//----------------------------------------------------------------------------------------

function update() {
    switch (game.mode) {
        case 'play':
            game.counter++;
            upadateScoreBoard();
            updateBall();
            updateCollisions();
            break;
    }
}

function upadateScoreBoard() {
    document.getElementById('lives').innerHTML = game.mode;
    document.getElementById('score').innerHTML = game.score;
    document.getElementById('bricksDestroyed').innerHTML = game.bricksDestroyed;
    document.getElementById('time').innerHTML = timer();
}

function updateBall() {
    var b = game.ball;
    b[0] += b[6];
    b[1] += b[7];
}

function updateCollisions() {
    var b = game.ball;
    //-------WALLS---------
    if (b[0] <= b[2]) { //left side of screen
        b[0] = b[2]; //might not like the effect this has
        b[6] = b[6] * -1;
    }
    if ((b[0] >= canvas.clientWidth) - b[2]) { //right side of screen
        b[0] = canvas.clientWidth - b[2]; //might not like the effect this has
        b[6] = b[6] * -1;
    }
    if (b[1] <= b[2]) { //top of screen
        b[1] = b[2];  //might not like the effect this has
        b[7] = b[7] * -1;
    }
    if (b[1] > canvas.clientHeight) { //bottom of screen
        lostBall();
    }
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

function initializeBricks() {
    var brickWidth = 75;
    var brickHeight = 25;
    var color = "#dcdfdc";
    var health = game.level;
    var powerUp = '';

    bricks = [];
    var rows = 6;
    var columns = 9;
    var brickSpacing = 1; //space between rows and columns of bricks
    var screenWidth = canvas.clientWidth;
    var screenSpacing = Math.floor((screenWidth - ((brickWidth * columns) + (brickSpacing * (columns - 1)))) / 2); //space between edge of screen and bricks

    for (var row = 0; row < rows; row++) {
        for (var col = 0; col < columns; col++) {
            var x = col * (brickSpacing + brickWidth);
            var y = row * (brickSpacing + brickHeight);
            bricks.push([(x + screenSpacing), (y + screenSpacing), brickWidth, brickHeight, color, health, powerUp]);
        }
    }
    return bricks;
}

//place the ball at the center of the screen
//make sure the ball starts off aiming toward the bottom
function initializeBall() {
    var b = game.ball;
    var radians = ((Math.random() * 2.08) + 3.67) * -1; //set angle to between 3.67 - 5.75 radians (210 - 330 degrees)
    b[6] = b[8] * Math.cos(radians);
    b[7] = b[8] * Math.sin(radians);
    b[0] = 375;
    b[1] = 245;
    //GOOD TO KNOW FOR REFERENCE
    //radians = (angle * (Math.PI / 180));
    //angle = (radians * (180 / Math.PI));
}

function lostBall() {
    game.tries -= 1;
    initializeBall();
    pause();
}