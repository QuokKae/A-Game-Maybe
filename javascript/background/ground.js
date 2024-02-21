export default class Ground {
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
        this.y = this.canvas.height - this.height + 10;
        // sets images
        this.groundImage = new Image();
        this.groundImage.src = './assets/images/floor.png';
    }
    
    draw(){
        this.ctx.drawImage(this.groundImage, this.x, this.y, this.width, this.height);
        // adds another ground image for a continuous loop
        this.ctx.drawImage(this.groundImage, this.x + this.width, this.y, this.width, this.height);
        // if statement to forever loop the two ground images forever
        if(this.x < -this.width){
            this.x = 0;
        }
    }

    update(gameSpeed, frameTimeDelta){
        this.x -= gameSpeed * frameTimeDelta * this.speed * this.screenRatio;
    }
}
