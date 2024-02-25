import Obst from "./obstacle.js";

export default class ObstControl {
    obstacle_interval_min = 1000;
    obstacle_interval_max = 4000;

    nextObstacleInterval = null;
    obstacles = [];

    constructor(ctx, obstacleImages, screenRatio, speed){
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.obstacleImages = obstacleImages;
        this.screenRatio = screenRatio;
        this.speed = speed;

        this.setNextTime();
    }

    setNextTime(){
        const num = this.getRandomNum(this.obstacle_interval_min, this.obstacle_interval_max);

        this.nextObstacleInterval = num;
    }
    
    getRandomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    createObstacle(){
        const index = this.getRandomNum(0, this.obstacleImages.length - 1);
        const obstImages = this.obstacleImages[index];
        const x = this.canvas.width * 1.5;
        const y = this.canvas.height - obstImages.height;
        const obst = new Obst(this.ctx, x, y, obstImages.width, obstImages.height, obstImages.image);

        this.obstacles.push(obst);
    }

    update(gameSpeed, frameTimeDelta) {
        if(this.nextObstacleInterval <= 0){
            this.createObstacle();
            this.setNextTime();
        }
        this.nextObstacleInterval -= frameTimeDelta;

        this.obstacles.forEach((obst) => {
            obst.update(this.speed, gameSpeed, frameTimeDelta, this.screenRatio);
        });

        this.obstacles = this.obstacles.filter((obst) => obst.x > -obst.width);
    }

    draw(){
        this.obstacles.forEach((obst) => obst.draw());
    }
 
    collideWith(sprite){
        return this.obstacles.some((obst) => obst.collideWith(sprite));
    }
}