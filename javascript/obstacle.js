export default class Obstacle{
    constructor(ctx, x, y, width, height, image){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image;
    }

    update(speed, gameSpeed, frameTimeDelta, screenRatio){
        this.x -= speed * gameSpeed * frameTimeDelta * screenRatio;
    }

    draw(){
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}