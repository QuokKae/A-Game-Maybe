export default class Ground {
    constructor(ctx, width, height, speed){
        // canvas
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        // sets sizes
        this.width = width;
        this.height = height;
        // sets speed
        this.speed = speed;
        // sets positioning
        this.x = 0;
        this.y = 0;
        // sets images
        this.groundImage = new Image();
        this.groundImage.src = './assets/images/ground.png';
    }
    draw(){
        this.ctx.drawImage(this.groundImage, this.x, this.y, this.width, this.height);
    }
}
