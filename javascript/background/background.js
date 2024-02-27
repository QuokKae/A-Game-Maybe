// static background hills
export default class Background {
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
        this.image = new Image();
        this.image.src = './assets/images/background.png';
        this.image.style.backgroundSize = "cover";
    }
    draw(){
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        // adds another ground image for a continuous loop
        this.ctx.drawImage(this.image, this.x + this.width - 100, this.y, this.width, this.height);
        this.ctx.drawImage(this.image, this.x + this.width + 315, this.y, this.width, this.height);
        this.ctx.drawImage(this.image, this.x + this.width + 365*2, this.y, this.width, this.height);
        this.ctx.drawImage(this.image, this.x + this.width + 382*3, this.y, this.width, this.height);


        if(this.x < -this.width){
            this.x = 0;
        }
    }

    update(gameSpeed, frameTimeDelta){
        this.x -= gameSpeed * frameTimeDelta * this.speed * this.screenRatio;
    }
}
