console.log('this is a placer log')

// imports other js files necessary for project
import Player from './player.js'
import Ground from './background/ground.js'


// sets up canvas variables
const canvas = document.getElementById("jumpgame");
const ctx = canvas.getContext("2d");
// sets canvas size
const game_width = 780;
const game_height = 200;
// sets avatar size
const avatar_width = 32;
const avatar_height = 32;
// sets jump height
const max_jumpH = game_height;
const min_jumpH = 150;
// sets ground size & speed
const ground_width = 1280;
const ground_height = 220;
const ground_speed = 0.5;
const game_speed_start = 0.75;
const game_speed_increment = 0.00001;

// Game Objects
let player = null;
let ground = null;

let screenRatio = null;
let previousTime = null;
let gameSpeed = game_speed_start;

function createSprites(){
    // player width & height
    const playerW = avatar_width * screenRatio;
    const playerH = avatar_height * screenRatio;
    // jump
    const minJump = min_jumpH * screenRatio;
    const maxJump = max_jumpH * screenRatio;
    // ground width & height
    const groundW = ground_width;
    const groundH = ground_height;
    // sets sprites
    player = new Player(ctx, playerW, playerH, minJump, maxJump, screenRatio);
    ground = new Ground(ctx, groundW, groundH, ground_speed, screenRatio);
}

// sets the canvas size dynamically by the screen ratio.
function setScreen() {
    screenRatio = getRatio();
    canvas.width = game_width * screenRatio;
    canvas.height = game_height * screenRatio;
    createSprites();
}

setScreen();

window.addEventListener("resize", setScreen);

// Finds the screen ratio of the device
function getRatio() {
    const screenH = Math.min(
            window.innerHeight, 
            document.documentElement.clientHeight
        );
    const screenW = Math.min(
            window.innerWidth, 
            document.documentElement.clientWidth
        );

    // if window is wider than the game width
    if(screenW / screenH < game_width / game_height) {
        return screenW / game_width
    }
    else {
        return screenH / game_height
    }
}

function clearScreen(){
    ctx.fillStyle = "#f2f2f2";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
// Game Loop
function gameLoop(currentTime){
    if(previousTime === null){
        previousTime = currentTime;
        requestAnimationFrame(gameLoop);
        return;
    }

    const frameTimeDelta = currentTime - previousTime;
    previousTime = currentTime;
    clearScreen();
    //Update Objects
    ground.update(gameSpeed, frameTimeDelta);
    player.update(gameSpeed, frameTimeDelta);

    //Draw Objects
    ground.draw();
    player.draw();

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);