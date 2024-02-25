console.log('this is a placer log')

// imports other js files necessary for project
import Player from './player.js'
import Ground from './background/ground.js'
import Background from './background/background.js'
import Tree from './background/trees.js';
import ObstControl from './obstControl.js';

// sets up canvas variables
const canvas = document.getElementById("jumpgame");
const ctx = canvas.getContext("2d");
// sets canvas size
const game_width = 500;
const game_height = 200;
// sets avatar size
const avatar_width = 32;
const avatar_height = 32;
// sets jump height
const max_jumpH = game_height;
const min_jumpH = 150;
// sets ground size & speed
const ground_width = 512;
const ground_height = 256;
const ground_speed = 0.2;
const game_speed_start = 0.75;
const game_speed_increment = 0.00001;

const obstacle_config = [
    {width: 124 / 1.5, height: 109 / 1.5, image: './assets/images/obstacle_1.png'},
    {width: 118 / 1.5, height: 130 / 1.5, image: './assets/images/obstacle_2.png'}
];

// Game Objects
let player = null;
let ground = null;
let background = null;
let tree = null;
let obstacleControl = null;

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
    background = new Background(ctx, groundW, groundH, ground_speed, screenRatio);
    tree = new Tree(ctx, groundW, groundH, ground_speed, screenRatio);

    // sets obstacles
    const obstacleImages = obstacle_config.map(obstacle =>{
        const image = new Image();
        image.src = obstacle.image;
        return{
            image: image,
            width: obstacle.width * screenRatio,
            height: obstacle.height * screenRatio,
        };
    });

    obstacleControl = new ObstControl(ctx, obstacleImages, screenRatio, ground_speed);

}

// sets the canvas size by the screen ratio.
function setScreen() {
    screenRatio = getRatio();
    canvas.width = screenRatio * game_width;
    canvas.height = screenRatio * game_height;
    createSprites();
}

setScreen();

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
    tree.update(gameSpeed, frameTimeDelta);
    ground.update(gameSpeed, frameTimeDelta);
    obstacleControl.update(gameSpeed, frameTimeDelta);
    player.update(gameSpeed, frameTimeDelta);

    //Draw Objects
    background.draw();
    tree.draw();
    ground.draw();
    obstacleControl.draw();
    player.draw();

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);