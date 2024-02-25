import Obstacle from "./obstacle.js";

export default class ObstControl {
    obst_interval_min = 500;
    obst_interval_max = 2000;

    nextObstacleInterval = null;
    obstacle = [];

    constructor(ctx, obstImages, screenRatio, speed){
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.obstImages = obstImages;
        this.screenRatio = screenRatio;
        this.speed = speed;

        this.setNextTime();
    }

    setNextTime(){
        const num = this.getRandomNum(this.obst_interval_min, this.obst_interval_max);

        this.nextObstacleInterval = num;
    }
    
    getRandomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    createObstacle(){
        const index = this.getRandomNum(0, this.obstImages.length - 1);
        const obstacleImages = this.obstImages[index];
        const x = this.canvas.width * 1.5;
        const y = this.canvas.height - obstacleImages.height;
        const obst = new Obstacle(this.ctx, x, y, obstacleImages.width, obstacleImages.height, obstacleImages.image);

        this.obstacle.push(obst);
    }

    update(gameSpeed, frameTimeDelta) {
        if(this.nextObstacleInterval <= 0){
            this.createObstacle();
            this.setNextTime();
        }
        this.nextObstacleInterval -= frameTimeDelta;

        this.obst.forEach((obst) => {
            obst.update(this.speed, gameSpeed, frameTimeDelta, this.screenRatio);
        });
    }

    draw(){
        this.obst.forEach((obst) => obst.draw());
    }
}