var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var game = {};

function Breakout() {
    game.phase = 'ready';
    game.playing = false;
    game.level = 1;
    game.win = false;
    game.lives = 3;
    game.score = 0;
    window.addEventListener('keydown', function (e) { keyListener(e) }, false);
    window.addEventListener('mousemove', function (e) { game.mouseX = e.clientX; }, false);
    game.timer = setInterval(function () { draw(); update() }, 40);
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

function keyListener(e) {
    switch (e.keyCode) {
        case 13 : //enter
            play();
            break;
        case 32: //space bar
            pause();
            break;
    }
}

function play() {
    document.getElementById('playButton').style.display = 'none';
    document.getElementById('pauseButton').style.display = 'block';
    document.getElementById('maskingLayer').style.display = 'none';
    document.getElementById('playPause').style.display = 'none';
    game.phase = 'play';
}

function pause() {
    document.getElementById('pauseButton').style.display = 'none';
    document.getElementById('playButton').style.display = 'block';
    document.getElementById('maskingLayer').style.display = 'inline';
    document.getElementById('playPause').style.display = 'block';
    game.phase = 'pause';
}

function draw() {
    drawScreen();
    drawPaddle();
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
    ctx.fillStyle = "#dcdfdc";
    ctx.fillRect(x, 455, 80, 20);
}

function upadateScoreBoard(lives, score, blocksDestroyed) {
    document.getElementById("lives").innerHTML = game.lives;
    document.getElementById("score").innerHTML = game.score;
    document.getElementById("blocksDestroyed").innerHTML = blocksDestroyed;
}

upadateScoreBoard(game.lives, game.score, blocksDestroyed);