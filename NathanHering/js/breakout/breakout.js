/// <reference path="paddle.js" />
//var canvas = document.getElementById("canvas");
//var ctx = canvas.getContext("2d");
var lives = canvas.width;
var score = canvas.height;
var blocksDestroyed = document.getElementById('blocksDestroyed').innerHTML;

//import * as paddle '~/js/breakout/paddle';

var game = {};

function breakout() {
    game.phase = 'ready';
    game.playing = false;
    game.level = 1;
    game.win = false;
    game.score = 0;

    game.bricks = {};
    game.paddle = {};
    game.ball = {};

    game.addEventListener('keyup', function (e) { game.keyCode = e.keyCode; }, false);
    game.timer = setInterval(function () { draw(); update() }, 40);
}

function ready() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    drawScreen(canvas, ctx);
    drawPaddle(canvas, ctx);
    window.addEventListener('keydown', keyListener(e.key), false);
    _blocksDestroyed = 4;
    play();

}

    function keyListener(e) {
        switch (e) {
        }
    }

    function play() {
        document.getElementById('playButton').style.display = 'none';
        document.getElementById('pauseButton').style.display = 'block';
    }

    function pause() {
        document.getElementById('pauseButton').style.display = 'none';
        document.getElementById('playButton').style.display = 'block';
    }

    function drawScreen(canvas, ctx) {
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
        document.getElementById("blocksDestroyed").innerHTML = blocksDestroyed;
    }

    function drawPaddle(canvas, ctx) {
        ctx.fillStyle = "#dcdfdc";
        ctx.fillRect(10, 455, 80, 20);
    }

    upadateScoreBoard(lives, score, blocksLeft);