var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var lives = canvas.width;
var score = canvas.height;
var blocksLeft = randomNumber();

function clearScreen(canvas) {
    ctx.fillStyle = "#223322";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function upadateScoreBoard(lives, score, blocksLeft) {
    document.getElementById("lives").innerHTML = lives;
    document.getElementById("score").innerHTML = score;
    document.getElementById("blocksLeft").innerHTML = blocksLeft;
}

function drawPaddle() {
    ctx.fillStyle = "#ddffdd";
    ctx.fillRect(10, 40, 30, 6);
}

function randomNumber() {
    return Math.floor((Math.random() * 10) + 1);
}

function loop() {
}

upadateScoreBoard(lives, score, blocksLeft);
clearScreen(canvas);
drawPaddle();