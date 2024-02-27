console.log('this is a placer log')

// imports other js files necessary for project
import Player from './player.js'
import Ground from './background/ground.js'
import Background from './background/background.js'
import Tree from './background/trees.js';
import ObstControl from './obstControl.js';
import Score from './scoring.js';

// sets up canvas variables
const canvas = document.getElementById("jumpgame");
const ctx = canvas.getContext("2d");
// sets canvas size
const game_width = 800;
const game_height = 200;
// sets avatar size
const avatar_width = 48;
const avatar_height = 48;
// sets jump height
const max_jumpH = game_height;
const min_jumpH = 150;
// sets ground size & speed
const ground_width = 512;
const ground_height = 256;
const ground_speed = 0.4;
const game_speed_start = 0.2;
const game_speed_increment = 0.00001;

const obstacle_config = [
    {width: 90 / 1.5, height: 96 / 1.5, image: './assets/images/obstacle_1.png'},
    {width: 98 / 1.5, height: 82 / 1.5,  image: './assets/images/obstacle_2.png'}
];

// Game Objects
let player = null;
let ground = null;
let background = null;
let tree = null;
let obstacleControl = null;
let score = null;

let screenRatio = null;
let previousTime = null;
let gameSpeed = game_speed_start;
let gameOver = false;
let hasAddedForRestart = false;
let waiting = true;

function createSprites(){
    // player width & height
    const playerW = avatar_width;
    const playerH = avatar_height;
    // jump
    const minJump = min_jumpH;
    const maxJump = max_jumpH;
    // ground width & height
    const groundW = ground_width;
    const groundH = ground_height;
    // sets sprites
    player = new Player(ctx, playerW, playerH, minJump, maxJump, screenRatio);
    ground = new Ground(ctx, groundW, groundH, ground_speed, screenRatio);
    background = new Background(ctx, groundW, groundH, screenRatio);
    tree = new Tree(ctx, groundW, groundH, ground_speed, screenRatio);

    // sets obstacles
    const obstacleImages = obstacle_config.map((obst) =>{
        const image = new Image();
        image.src = obst.image;
        return{
            image: image,
            width: obst.width,
            height: obst.height,
        };
    });

    obstacleControl = new ObstControl(ctx, obstacleImages, screenRatio, ground_speed);

    score = new Score(ctx, screenRatio);
}

// sets the canvas size by the screen ratio.
function setScreen() {
    screenRatio = getRatio();
    canvas.width = game_width;
    canvas.height = game_height;
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
        return screenW / game_width;
    }
    else {
        return screenH / game_height;
    }
}

// game over screen
function gameOverScreen() {
    const fontSize = 2.5;
    ctx.font = `${fontSize}rem "Pixelify Sans"`;
    ctx.fillStyle = "darkgreen";
    const x = canvas.width / 3;
    const y = canvas.height / 1.8;
    ctx.fillText("game over", x, y);
}

function showStart() {
    const fontSize = 2.5;
    ctx.font = `${fontSize}rem "Pixelify Sans"`;
    ctx.fillStyle = "darkgreen";
    const x = canvas.width / 4.5;
    const y = canvas.height / 1.8;
    ctx.fillText("press any key to start!", x, y);
}


function setGameReset() {
    if(!hasAddedForRestart) {
        hasAddedForRestart = true;

        setTimeout(() => {
            window.addEventListener("keyup", reset, {once:true});
        }, 500);
    }
}

function reset () {
    hasAddedForRestart = false;
    gameOver = false;
    waiting = false;
    ground.reset();
    obstacleControl.reset();
    tree.reset();
    score.reset();
    gameSpeed = game_speed_start;
}

function updateGameSpeed(frameTimeDelta) {
    gameSpeed += frameTimeDelta * game_speed_increment;
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


    if(!gameOver && !waiting){

        //Update Objects
        tree.update(gameSpeed, frameTimeDelta);
        ground.update(gameSpeed, frameTimeDelta);
        obstacleControl.update(gameSpeed, frameTimeDelta);
        player.update(gameSpeed, frameTimeDelta);
        score.update(frameTimeDelta);
        updateGameSpeed(frameTimeDelta);
    }

    if(!gameOver && obstacleControl.collideWith(player)){
        gameOver = true;
        setGameReset();
        score.setHighScore();
    }

    //Draw Objects
    background.draw();
    tree.draw();
    ground.draw();
    obstacleControl.draw();
    player.draw();
    score.draw();

    if(gameOver){
        gameOverScreen();
    }

    if(waiting){
        showStart();
    }

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
window.addEventListener("keyup", reset, {once:true});