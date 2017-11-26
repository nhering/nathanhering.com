/// <reference path="paddle.js" />
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var lives = canvas.width;
var score = canvas.height;
var blocksLeft = randomNumber();

//import * as paddle '~/js/breakout/paddle';

function drawScreen(canvas) {
    ctx.fillStyle = "#223322";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var gradient = ctx.createLinearGradient(0, 400, 0, 490);
    gradient.addColorStop(0, '#223322');
    gradient.addColorStop(1, '#101010');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 400, 785, 90);
}

function upadateScoreBoard(lives, score, blocksLeft) {
    document.getElementById("lives").innerHTML = lives;
    document.getElementById("score").innerHTML = score;
    document.getElementById("blocksLeft").innerHTML = blocksLeft;
}

function drawPaddle() {
    ctx.fillStyle = "#dcdfdc";
    ctx.fillRect(10, 450, 80, 20);
}

function randomNumber() {
    return Math.floor((Math.random() * 10) + 1);
}

function loop() {
}

upadateScoreBoard(lives, score, blocksLeft);
drawScreen(canvas);
drawPaddle();