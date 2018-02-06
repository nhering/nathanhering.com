﻿//"use strict";

//----------------------------------------------------------------------------------------
//---------------------------------------------------------------------------DEFINITIONS--
//----------------------------------------------------------------------------------------

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var game = {};
var paddle = {};
var ball = {};
var bricks = [];
var token = {};
var bonus = {};
var player = {};

function Breakout() {
    game.ball = [375, 245, 7, 0, 2 * Math.PI, '#dcdfdc', 0, 0, 7];//[0]xCoord, [1]yCoord, [2]radius, [3]startAngle, [4]endAngle, [5]color, [6]xVelocity, [7]yVelocity, [8]speed
    game.player = [1,0]
    game.info = ["", 0]//[0]desctription, [1]timer
    game.mode = 'ready';
    game.nextMode = '';
    game.message = '';
    game.level = 0;
    game.tries = 3;
    game.score = 0;
    game.bricksDestroyed = 0;
    game.counter = 0;
    game.time = 0;
    game.mouseX;
    game.refresh = 40;
    canvas.style.cursor = 'default';
    _tokens();
    _player();
    _bonus();
    drawScore();
    drawScreen();
    window.addEventListener('keyup', function (e) { keyListener(e) }, false);
    window.addEventListener('mousemove', function (e) { game.mouseX = e.clientX; }, false);
    game.timer = setInterval(function () { draw(); update(); }, game.refresh);
}

//----------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------INPUT--
//----------------------------------------------------------------------------------------

function keyListener(e) {
    switch (e.keyCode) {
        case 13: //(enter)------PLAY & CONTINUE
            play();
            break;
        case 32: //(space)------PAUSE 
            pause();
            break;
        case 27: //(escape)-----QUIT
            quit('request');
            break;
        default:
            break;
    }
}

function play() {
    var noPlay = ['playing', 'counter', 'message', 'gameOver', 'quit'];
    if (noPlay.indexOf(game.mode) > -1) return;

    if (game.mode == 'pause') {
        resume();
    } else {
        newGame();
    }
}

function resume() {
    game.mode = 'playing';
    setStyle('display', 'none', ['continueButton', 'continueModal', 'quitModal', 'disabledPauseButton']);
    setStyle('display', 'block', ['pauseButton']);
    setStyle('cursor', 'none', ['canvas']);
}

function pause() {
    var noPause = ['message', 'ready', 'counter', 'gameOver', 'quit'];
    if (noPause.includes(game.mode)) return;

    if (game.mode == 'pause') resume();
    game.mode = 'pause';
    document.getElementById('pauseButton').style.display = 'none';
    document.getElementById('continueButton').style.display = 'block';
    document.getElementById('continueModal').style.display = 'block';
    document.getElementById('canvas').style.cursor = 'default';
}

function quit(option) {
    var noQuit = ['ready', 'gameOver', 'message', 'counter'];
    if (noQuit.indexOf(game.mode) > -1) return;

    if (option == 'request') {
        game.mode = 'quit';
        setStyle('display', 'none', ['playButton', 'pauseButton', 'continueModal', 'continueButton']);
        setStyle('display', 'block', ['quitModal', 'disabledPauseButton']);
        setStyle('cursor', 'default', ['canvas']);
    } else {
        game.mode = 'ready';
        setStyle('display', 'none', ['quitModal', 'disabledPauseButton']);
        setStyle('display', 'block', ['playButton']);
    }
}

//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------DRAW--
//----------------------------------------------------------------------------------------

function draw() {
    drawInfo();
    switch (game.mode) {
        case 'ready':
            drawStandardSet();
            break;
        case 'playing':
            drawStandardSet();
            drawBall();
            break;
        case 'message':
            drawStandardSet();
            drawMessage();
            break;
        case 'counter':
            drawStandardSet();
            drawCount();
            break;
        case 'gameOver':
            drawStandardSet();
            break;
    }
}

function drawStandardSet() {
    drawScreen();
    drawPaddle();
    drawBricks();
    drawStats();
    drawScore();
    drawBonus();
}

function drawScreen() {
    ctx.fillStyle = '#223322';
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    var gradient = ctx.createLinearGradient(0, canvas.clientHeight - 15, 0, 490);
    gradient.addColorStop(0, '#223322');
    gradient.addColorStop(1, '#101010');
    ctx.fillStyle = gradient;
    if (bonus.blockade > 0) {
        drawBlocade();
    } else {
        ctx.fillRect(0, canvas.clientHeight - 15, canvas.clientWidth, 15);
    }
}

function drawBlocade() {
    ctx.fillStyle = '#557755';
    ctx.fillRect(bonus.blockadeX, bonus.blockadeY, bonus.blockadeWidth, bonus.blockadeHeight);
}

function drawPaddle() {
    paddle.top = 455;
    if (bonus.expand > 0) {
        paddle.width = 120;
    } else {
        paddle.width = 80;
    }
    paddle.height = 20;
    var right = canvas.clientWidth - paddle.width;
    paddle.x = game.mouseX - canvas.getBoundingClientRect().left - (paddle.width/2);
    if (paddle.x <= 0) { paddle.x = 0 };
    if (paddle.x >= right) { paddle.x = right };
    ctx.fillStyle = '#dcdfdc';
    ctx.fillRect(paddle.x, paddle.top, paddle.width, paddle.height);
}

function drawBall() {
    var b = game.ball;
    ctx.beginPath();
    ctx.arc(b[0], b[1], b[2], b[3], b[4]);
    ctx.fillStyle = b[5];
    ctx.fill();
}

function drawBricks() {
    for (var i = 0; i < bricks.length; i++) {
        ctx.fillStyle = bricks[i][4];
        ctx.fillRect(bricks[i][0], bricks[i][1], bricks[i][2], bricks[i][3]);

        var fontSize = 12;
        var fontName = "Consolas";
        var message = bricks[i][5];
        var messageLen = bricks[i][5].toString().length;
        var x = bricks[i][0] + (bricks[i][2] / 2) - ((fontSize / 4) * messageLen);
        var y = bricks[i][1] + (bricks[i][3] / 2) + (fontSize / 3);
        ctx.fillStyle = 'black';
        ctx.font = fontSize + 'px ' + fontName;
        ctx.fillText(message, x, y);
    }
}

function drawMessage() {
    var m = document.getElementById('message');

    if (game.counter > game.refresh) {
        m.style.display = 'block';
        m.innerHTML = game.message;
    } else {
        m.style.display = 'none';
    }
}

function drawCount() {
    document.getElementById('counter').style.display = 'block';
}

function drawInfo() {
    var opacityLevel = game.info[1] / 1000;
    setInnerHTML(game.info[0], 'statusInfo');
    if (game.info[1] > 0) {
        if (game.info[1] < 1000) {
            setStyle('opacity', opacityLevel, ['statusInfo']);
        }
    } else {
        game.info[0] = '';
    }
}

function drawStats() {
    setInnerHTML(game.level, 'level');
    setInnerHTML(game.tries, 'tries');
    setInnerHTML(player.strength, 'strength');
}

function drawScore() {
    setInnerHTML(game.score, 'score');
    setInnerHTML(game.bricksDestroyed, 'bricksDestroyed');
    setInnerHTML(timer(game.time), 'time');
}

function drawBonus() {
    var second = 1000 / game.refresh;
    setInnerHTML(timer(bonus.expand * second), 'bonusExpand');
    setInnerHTML(timer(bonus.blockade * second), 'bonusBlockade');
    setInnerHTML(timer(bonus.hammer * second), 'bonusHammer');
    if (bonus.expand > 0) {
        changeClass('infoBlockInactive', 'infoBlockActive', 'bonusExpandBlock');
    } else {
        changeClass('infoBlockActive', 'infoBlockInactive', 'bonusExpandBlock');
    }
    if (bonus.blockade > 0) {
        changeClass('infoBlockInactive', 'infoBlockActive', 'bonusBlockadeBlock');
    } else {
        changeClass('infoBlockActive', 'infoBlockInactive', 'bonusBlockadeBlock');
    }
    if (bonus.hammer > 0) {
        changeClass('infoBlockInactive', 'infoBlockActive', 'bonusHammerBlock');
    } else {
        changeClass('infoBlockActive', 'infoBlockInactive', 'bonusHammerBlock');
    }
}

//----------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------UPDATE--
//----------------------------------------------------------------------------------------

function update() {
    updateInfo();
    switch (game.mode) {
        case 'ready':
            updateBonus();
            initializeBricks();
            break;
        case 'playing':
            if (bricks.length == 0) { initializeLevel() }
            game.time++;
            updateBall();
            updateBonus();
            break;
        case 'message':
            updateMessage();
            break;
        case 'counter':
            updateCount();
            break;
    }
}

function updateBonus() {
    if (document.getElementById('time').innerHTML != bonus.lastSecond) {
        bonus.lastSecond = document.getElementById('time').innerHTML;
        if (bonus.expand > 0) {
            bonus.expand -= 1;
        } else {
            bonus.expand = 0;
        }
        if (bonus.blockade > 0) {
            bonus.blockade -= 1;
        } else {
            bonus.blockade = 0;
        }
        if (bonus.hammer) {
            bonus.hammer -= 1;
        } else {
            bonus.hammer = 0;
        }
    }
}

function updateBall() {
    var collide = false;

    var b = game.ball;
    //X coordinates
    var baL = b[0] - b[2];//left
    var baX = b[0];//center x
    var baR = b[0] + b[2];//right
    //Y coordinates
    var baT = b[1] - b[2];//top
    var baY = b[1];//center y
    var baB = b[1] + b[2];//bottom

    var pT = paddle.top;
    var pB = paddle.top + paddle.height;//paddle's bottom
    var pL = paddle.x;//paddle's left edge
    var pR = paddle.x + paddle.width;//paddle's right edge

    //---------------------------------WALLS---
    //-----------------------------------------
    if (collide == false) {
        if (b[0] <= b[2]) {
            b[0] = b[2];
            b[6] *= -1;
            collide = true;
        } //hit left side of screen
        if (b[0] >= (canvas.clientWidth - b[2])) {
            b[0] = canvas.clientWidth - b[2];
            b[6] *= -1;
            collide = true;
        } //hit right side of screen
        if (b[1] <= b[2]) {
            b[1] = b[2];
            b[7] *= -1;
            collide = true;
        } //hit top of screen
        if (b[1] > (canvas.clientHeight + b[2] * 10)) {
            game.tries -= 1;
            document.getElementById('tries').innerHTML = game.tries;
            collide = true;
            lostBall();
        } //off bottom of screen
    }

    //------------------------------BLOCKADE---
    //-----------------------------------------
    if (collide == false && bonus.blockade > 0) {
        if (baB >= bonus.blockadeY) {
            b[7] *= -1;
            collide = true;
        }
    }

    //--------------------------------PADDLE---
    //-----------------------------------------
    if (collide == false) {
        if (baX >= pL && baX <= pR && baB >= pT && baB < pB) {
            if (baB > pT) { b[1] = pT - b[2] };
            calculateAngle();
            b[7] *= -1;
            game.score += player.strength;
            collide = true;
        } //hit top of paddle
    }

    function calculateAngle() {
        var b = game.ball;
        p1x = paddle.x + (paddle.width / 2);
        p1y = paddle.top - (paddle.height * 2);
        p2x = b[0];
        p2y = b[1];
        var radians = Math.atan2(p2y - p1y, p2x - p1x);
        b[6] = b[8] * Math.cos(radians);
        b[7] = b[8] * Math.sin(radians);
    }

    //--------------------------------BRICKS---
    //-----------------------------------------
    //[0] = x, [1] = y, [2] = width, [3] = height, [4] = color, [5] = health, [6] = powerUp
    if (collide == false) {
        for (var i = 0; i < bricks.length; i++) {
            if (b[6] > 0 && b[7] >= 0) {
                if (hitTop(i)) {
                    break;
                } else if (hitLeft(i)) {
                    break;
                }
            } else if (b[6] > 0 && b[7] <= 0) {
                if (hitBottom(i)) {
                    break;
                } else if (hitLeft(i)) {
                    break;
                }
            } else if (b[6] < 0 && b[7] >= 0) {
                //top,right
                if (hitTop(i)) {
                    break;
                } else if (hitRight(i)){
                    break;
                }
            } else if (b[6] < 0 && b[7] <= 0) {
                //bottom,right
                if (hitBottom(i)) {
                    break;
                } else if (hitRight(i)) {
                    break;
                }
            }
        }
    }

    function hitTop(i) {
        if (baX >= bricks[i][0] &&
            baX <= bricks[i][0] + bricks[i][2] &&
            baB > bricks[i][1] &&
            baT < bricks[i][1]) {
            if (bonus.hammer <= 0) { b[7] *= -1; }
            doDamage(i)
            return true;
        } else {
            return false;
        }
    }

    function hitRight(i) {
        if (baY >= bricks[i][1] &&
            baY <= bricks[i][1] + bricks[i][3] &&
            baL <= bricks[i][0] + bricks[i][2] &&
            baR >= bricks[i][0] + bricks[i][2]) {
            if (bonus.hammer <= 0) { b[6] *= -1; }
            doDamage(i)
            return true;
        } else {
            return false;
        }
    }

    function hitBottom(i) {
        if (baX >= bricks[i][0] &&
            baX <= bricks[i][0] + bricks[i][2] &&
            baT <= bricks[i][1] + bricks[i][3] &&
            baB >= bricks[i][1] + bricks[i][3]) {
            if (bonus.hammer <= 0) { b[7] *= -1; }
            doDamage(i)
            return true;
        } else {
            return false;
        }
    }

    function hitLeft(i) {
        if (baY >= bricks[i][1] &&
            baY <= bricks[i][1] + bricks[i][3] &&
            baR >= bricks[i][0] &&
            baL <= bricks[i][0]) {
            if (bonus.hammer <= 0) { b[6] *= -1; }
            doDamage(i)
            return true;
        } else {
            return false;
        }
    }

    function doDamage(i) {
        var damageDone = bricks[i][5];
        if (bonus.hammer > 0) {
            damageDone = bricks[i][5];
            bricks.splice(i, 1);
            game.bricksDestroyed += 1;
            //insert token drop logic here
        } else {
            bricks[i][5] -= player.strength
            if (bricks[i][5] <= 0) {
                bricks[i][5] = 0;
                damageDone -= bricks[i][5];
                bricks.splice(i, 1);
                game.bricksDestroyed += 1;
                //insert token drop logic here
            } else {
                damageDone -= bricks[i][5];
            }
        }
        game.score += damageDone;
    }

    //move the ball
    b[0] += b[6];
    b[1] += b[7];
}

function updateCount() {
    var c = document.getElementById('counter');
    var count = game.counter;
    var boxShadow = Math.floor(count / 50);
    var textShadow = (Math.floor((35 * ((count / 1000) - Math.floor(count / 1000)))));
    var fadeRing = ((1000 + count) / 1000);

    if (count > 0) {
        setStyle('opacity', 1, ['counter']);
        c.style.boxShadow = "0px 0px " + boxShadow + "px black inset, 0px 0px " + boxShadow + "px green";
        c.style.textShadow = "2px 2px 5px black, 0px 0px " + textShadow + "px green";
        c.innerHTML = Math.ceil(count / 1000);
    } else if (count <= 0 && count > -1000) {
        setStyle('opacity', fadeRing, ['counter']);
        c.style.boxShadow = "";
        c.innerHTML = "";
    } else {
        drawBall();
        setStyle('display', 'none', ['counter']);
        game.mode = 'playing';
    }
    initializeBall();
    game.counter -= game.refresh;
}

function updateMessage() {
    game.counter -= game.refresh;
    if (game.counter < 0) {
        switch (game.nextMode) {
            case 'counter':
                game.counter = 3000;
                game.mode = 'counter';
                break;
            case 'playing':
                game.mode = 'playing';
                break;
        }
    }
}

function updateInfo() {
    if (game.info[1] > 0) {
        game.info[1] -= game.refresh;
    }
}

//----------------------------------------------------------------------------------------
//---------------------------------------------------------------------------SUBROUTINES--
//----------------------------------------------------------------------------------------

function timer(time) {
    var s = Math.floor((time / (1000 / game.refresh)) % 60);
    var m = Math.floor(((time / (1000 / game.refresh)) / 60) % 60);
    var second = 0;
    var minute = 0;

    if (s < 10) { second = ('0' + s); }
    else { second = s }

    if (m > 0) {
        minute = m;
    } else {
        minute = ""}

    return (minute + ':' + second);
}

function initializeLevel() {
    game.level += 1;
    initializeBricks();
    initializeMessage(1500, 'Begin level ' + game.level, 'counter');
}

function _tokens() {// [0]xCoord, [1]yCoord, [2]radius, [3]startAngle, [4]endAngle, [5]color,  [6]Display on token,    [7]Points,      [8]Unique value
    token.tries =       [0, 0, 10, 0, 2 * Math.PI, '#55ccee', 'T', 10, 1];//[8] amount added to tries
    token.strength =    [0, 0, 10, 0, 2 * Math.PI, '#55ccee', 'S', 10, 1];//[8] amount added to strength
    token.expand =      [0, 0, 10, 0, 2 * Math.PI, '#55ccee', 'E', 20, 30];//[8] amount added to duration of bonus
    token.blockade =    [0, 0, 10, 0, 2 * Math.PI, '#55ccee', 'B', 40, 20];//[8] amount added to duration of bonus
    token.hammer =      [0, 0, 10, 0, 2 * Math.PI, '#55ccee', 'J', 80, 10];//[8] amount added to duration of bonus
}

function _player() {
    player.strength = 1;
}

function _bonus() {//[0]Seconds, [1]Is Active
    bonus.lastSecond = ':00'; //used to count down

    bonus.expand = 5;

    bonus.blockade = 10;
    bonus.blockadeX = 5;
    bonus.blockadeY = canvas.clientHeight - 10; //top
    bonus.blockadeWidth = canvas.clientWidth - (bonus.blockadeX * 2),
    bonus.blockadeHeight = 5;

    bonus.hammer = 0;
}

function initializeTokens() {
    //
    
}

function initializeBricks() {
    var brickWidth = 75;
    var brickHeight = 25;
    var color = "#dcdfdc";
    var health = game.level;
    var token = '';

    bricks = [];
    var rows = 1;
    var columns = 1;
    var brickSpacing = 2; //space between rows and columns of bricks
    var screenWidth = canvas.clientWidth;
    var screenSpacing = Math.floor((screenWidth - ((brickWidth * columns) + (brickSpacing * (columns - 1)))) / 2); //space between edge of screen and bricks

    for (var row = 0; row < rows; row++) {
        for (var col = 0; col < columns; col++) {
            var x = col * (brickSpacing + brickWidth);
            var y = row * (brickSpacing + brickHeight);
            bricks.push([(x + screenSpacing), (y + screenSpacing), brickWidth, brickHeight, color, health, token]);
        }
    }
    return bricks;
}

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

function initializeMessage(counter, message, nextMode) {
    var nextMode = nextMode ? nextMode : 'playing';
    game.counter = counter;
    game.message = message;
    game.mode = 'message';
    game.nextMode = nextMode;
}

function lostBall() {
    var lostBallMessages = ['That one got away!', 'Oh no!', 'Ouch, that hurt!', 'Yikes!!', 'You lost one!', "It's gone!", 'Aw man!', 'Bummer...', 'Try harder.', 'What?!?', 'Get to llama school!']
    var message = lostBallMessages[Math.floor((Math.random() * lostBallMessages.length))];
    if (game.tries > 0) {
        initializeMessage(1500, message, 'counter');
    } else {
        initializeMessage(2000, 'GAME OVER', 'gameOver');
        game.mode = 'gameOver';
    }
}

function newGame(){
    game.ball = [375, 245, 7, 0, 2 * Math.PI, '#dcdfdc', 0, 0, 7];
    game.nextMode = '';
    game.message = '';
    game.level = 0;
    game.tries = 3;
    game.score = 0;
    game.bricksDestroyed = 0;
    game.counter = 0;
    game.time = 0;
    game.mode = 'playing';
    setStyle('cursor', 'none', ['canvas']);
    setStyle('display', 'block', ['pauseButton']);
    setStyle('display', 'none', ['quitModal', 'playButton', 'continueButton', 'continueModal', 'disabledPauseButton']);
    drawScore();
    drawScreen();
    initializeLevel();
    _player();
    _bonus();
    _tokens();
}

function setStyle(style, value, ids) {
    for (var i = 0; i < ids.length ; i++){
        document.getElementById(ids[i]).style[style] = value;
    }
}

function setInnerHTML(value, id) {
    document.getElementById(id).innerHTML = value
}

function changeClass(removeClass, addClass, id) {
    document.getElementById(id).classList.remove(removeClass);
    document.getElementById(id).classList.add(addClass);
}

function showInfo(option, time) {
    switch (option) {
        case 'ExpandDefinition':
            game.info[0] = "<span class='bonusTitle'>EXPAND</span><span class='bonusDefinition'> makes your paddle wider. Making it easier to hit the ball.</span><br/><br/><span class='bonusTokenDefinition'>Catching an Expand token will give you this bonus for 30 seconds.</span>"
            break;
        case 'BlockadeDefinition':
            game.info[0] = "<span class='bonusTitle'>BLOCKADE</span><span class='bonusDefinition'> creates a wall at the bottom of the playing field that the ball will bounce off of. Making it imposible to loose a ball!</span><br/><span class='bonusTokenDefinition'>Catching Blockade token will give you this bonus for 20 seconds.</span>"
            break;
        case 'HammerDefinition':
            game.info[0] = "<span class='bonusTitle'>HAMMER</span><span class='bonusDefinition'> makes your ball unstoppable. It will destroy all bricks in its path without bouncing off of them.</span><br/><span class='bonusTokenDefinition'>Catching a Hammer token will give you this bonus for 10 seconds.</span>"
            break;
        case 'TokenAwardedTries':
            game.info[0] = "<span class='tokenAwarded'>EXTRA TRY TOKEN!</span>"
            break;
        case 'TokenAwardedStrength':
            game.info[0] = "<span class='tokenAwarded'>INCREASE STRENGTH TOKEN!</span>"
            break;
        case 'TokenAwardedExpand':
            game.info[0] = "<span class='tokenAwarded'>EXPAND TOKEN!</span>"
            break;
        case 'TokenAwardedBlockade':
            game.info[0] = "<span class='tokenAwarded'>BLOCKADE TOKEN!</span>"
            break;
        case 'TokenAwardedHammer':
            game.info[0] = "<span class='tokenAwarded'>HAMMER TOKEN!</span>"
            break;
    }
    game.info[1] = time;
    setStyle('opacity', 1, ['statusInfo']);
}