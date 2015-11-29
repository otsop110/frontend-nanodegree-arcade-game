"use strict";


// Constructing the Enemy our player must avoid
var Enemy = function() {

    // Initializes enemy with start positions and sets enemy speed
    this.x = -100;
    this.y = Math.floor(Math.random() * (250 - 50 + 1)) + 50;
    this.speed = Math.floor(Math.random() * (300 - 100 + 1) + 100);

    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks will ensure
// that the game runs at the same speed for all computers.
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
        if (this.x > 500) {
            this.resetPosition();
    }
};

//Enemy's start position after reset

Enemy.prototype.resetPosition = function() {
    this.x = -100;
    this.y = Math.floor(Math.random() * (250 - 50 + 1)) + 50;
    this.speed = Math.floor(Math.random() * (300 - 100 + 1) + 100);
};

//Checks the x and y coordinates of each enemy and player. If collision, resets player position.

var checkCollisions = function() {
    allEnemies.forEach(function (enemy) {
        if (((player.x - 50) < enemy.x) &&
            (enemy.x < (player.x + 50)) &&
            ((player.y - 50) < enemy.y) &&
            (enemy.y < (player.y + 45))) {
            player.resetPosition();
            alert('You lost. GAME OVER!');
            }
        });
};

// Draws the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Constructing the player: initializes player with start position and sprites the image
var Player = function(){
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-boy.png';
};

// Keeps player on the canvas and updates player position, if player hits the water
Player.prototype.update = function() {
    if (this.x < 0) {
        this.x = 0;
    } else if (this.x > 400) {
        this.x = 400;
    } else if (this.y < -10) {
        this.y = -50;
        player.resetPosition();
        alert('You WON! Play again!');
    } else if (this.y > 400) {
        this.y = 400;
    }
};

// Resets players position into start coordinates
Player.prototype.resetPosition = function () {
    this.x = 200; // x Position
    this.y = 400; // y position
};

// Shows player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Defines the player movements to key presses
Player.prototype.handleInput = function(keys) {
    switch(keys){
        case 'left': if(this.x > 0) {this.x = this.x - 101;}
            break;
        case 'right': if(this.x < 500) {this.x = this.x + 101;}
            break;
        case 'up': this.y = this.y - 83;
            break;
        case 'down': if(this.y < 500) {this.y = this.y + 83;}
            break;
    }
};


// Instantiating objects
var enemy = new Enemy();
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
var player = new Player();


// Listening for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});