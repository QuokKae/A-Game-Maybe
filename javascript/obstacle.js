export default class Obst{
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

    collideWith(sprite) {
        const adjustBy = 1.4;
        if (
            sprite.posX < this.x + this.width / adjustBy &&
            sprite.posX + sprite.width / adjustBy > this.x  &&
            sprite.posY < this.y + this.height / adjustBy &&
            sprite.height + sprite.posY / adjustBy > this.y
        ) {
            return true;
        }else {
            return false;
        }
    
    }
}