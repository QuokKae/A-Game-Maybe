console.log('this is a placer log')

// imports other js files necessary for project
import Player from './player.js'
import Ground from './ground.js'

// sets up canvas variables
const canvas = document.getElementById("jumpgame");
const ctx = canvas.getContext("2d");
// sets canvas size
const game_width = canvas.style.width = '70vw';
const game_height = canvas.style.height = '40vh';
// sets avatar size
const avatar_width = 24;
const avatar_height = 24;
// sets ground size
const ground_width = 2400;
const ground_height = 24;
const ground_speed = 0.5;

// Game Objects
let player = null;
let ground = null;

let screenRatio = null;

function createSprites(){
    // player width & height
    const playerW = avatar_width;
    const playerH = avatar_height;
    // ground width & height
    const groundW = ground_width;
    const groundH = ground_height;
    // sets sprites
    player = new Player(ctx, playerW, playerH);
    ground = new Ground(ctx, groundW, groundH, ground_speed);
}

function setScreen() {
    canvas.width = game_width;
    canvas.height = game_height;
    createSprites();
}

setScreen();

function clearScreen(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
// Game Loop
function gameLoop(){
    clearScreen();
    //Update Objects

    //Draw Objects
    player.draw();
    ground.draw();

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);