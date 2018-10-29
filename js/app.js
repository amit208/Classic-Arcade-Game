// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Position of the enemy on the x-axis
    this.x = x;
    // Position of the enemy on the y-axis
    this.y = y;
    // Speed of the enemy + Math.random is used to give the enemies some additional random speed
    this.speed = speed + (Math.random() * 50);
    
    // Image of the Enemy
    this.sprite = 'images/enemy-bug.png';
};


// These array will be used to give the player a new random position
let playerXAxis = [102, 202, 302, 402];
let playerYAxis = [305, 405];

//Updating the enemies position
Enemy.prototype.update = function(dt) {
    // Multiplying by time delta function to ensure the same speed in all the computers
    this.x += this.speed * dt;

    // If the enemies are out of the canvas then they will be place on the left side of the canvas to reappear
    if (this.x > 510) {
        this.x = -20;   //-20 will take the enemy 20px far from the starting point
        this.speed = 100 + Math.floor(Math.random() * 300); //This will give the enemies a random speed
    };

    // This code will run if the player and the enemy will colloid and will also give the player a new random position on the grass area
    if (player.x < this.x + 80 && player.x + 80 > this.x && player.y < this.y + 60 && player.y + 60 > this.y) {
        player.x = playerXAxis[Math.floor(Math.random() * 4)];  //From the array in line 16
        console.log(`x-axis ${player.x}`);
        player.y = playerYAxis[Math.floor(Math.random() * 2)];  //From the array in line 17
        console.log(`y-axis ${player.y}`);
    };
};

// This code will draw the enemy on the canvas/screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Constructor function for the Players
let Player = function(x, y) {
    // Player's position on the x-axis
    this.x = x;
    // Player's position on the y-axis
    this.y = y;

    // Player's image
    this.sprite = "images/char-boy.png";
}

// This class requires an update(), render() and
// a handleInput() method.

Player.prototype.update = function(dt) {}

// This code will be used to render the player into the game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// This code will be used to handle the users input
Player.prototype.handleInput = function(keyPress) {
    // For left keypress
    if (keyPress === "left" && this.x >0) {
        this.x -= 102;
        console.log(this.x);
    };

    // For right keypress
    if (keyPress === "right" && this.x < 400) {
        this.x += 102;
        console.log(this.x);
    };

    // For up keypress
    if (keyPress === "up" && this.y > 0) {
        this.y -= 83;
        console.log(this.y);
    };

    // For down keypress
    if (keyPress === "down" && this.y < 380) {
        this.y += 83;
        console.log(this.y);
    };

    // If the player reached to the water, then this code will show a message and will give it a random position on the grass
    if (this.y < 0) {
        setTimeout(() => {
            alert("Yay!!! You Won");
            this.x = playerXAxis[Math.floor(Math.random() * 4)];
            this.y = playerYAxis[Math.floor(Math.random() * 2)];
        }, 500);
    };
};

// This code will create a new player and will place it at random place
let player = new Player(playerXAxis[Math.floor(Math.random() * 4)], playerYAxis[Math.floor(Math.random() * 2)]);

// Place all enemy objects in an array called allEnemies
let allEnemies = [];

// This array contains the location of the enemies on the Y-axis
let enemyLocation = [63, 147, 230];

// This code will position the enemies and will push it to the "allEnemies" array
enemyLocation.forEach(function (locationY) {
    enemy = new Enemy(0, locationY, 200);
    allEnemies.push(enemy);
});


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
