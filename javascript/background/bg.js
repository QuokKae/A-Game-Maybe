export default class Backgrd {
    constructor(ctx, width, height, speed, screenRatio){
        // canvas
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.screenRatio = screenRatio;
        // sets sizes
        this.width = width;
        this.height = height;
        // sets speed
        this.speed = speed;
        // sets positioning
        this.x = 0;
        this.y = this.canvas.height - this.height;
        // sets background
        this.bgImage = new Image();
        this.bgImage.src = './assets/images/background.png';
    }
    draw(){
        this.ctx.drawImage(this.bgImage, this.x, this.y, this.width, this.height);
        // adds another ground image for a continuous loop
        this.ctx.drawImage(this.bgImage, this.x + this.width, this.y, this.width, this.height);
        // this.ctx.drawImage(this.bgImage, this.x + this.width + this.width, this.y, this.width, this.height);
        // if statement to forever loop the two ground images forever
        if(this.x < -this.width){
            this.x = 0;
        }
    }

    update(gameSpeed, frameTimeDelta){
        this.x -= gameSpeed * frameTimeDelta * this.speed * this.screenRatio;
    }

}
