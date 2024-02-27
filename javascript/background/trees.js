export default class Tree {
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
        this.treeImage = new Image();
        this.treeImage.src = './assets/images/trees_front.png';
    }
    draw(){
        this.ctx.drawImage(this.treeImage, this.x, this.y, this.width, this.height);
        // adds another ground image for a continuous loop
        this.ctx.drawImage(this.treeImage, this.x + this.width, this.y, this.width, this.height);
        this.ctx.drawImage(this.treeImage, this.x + this.width + this.width, this.y, this.width, this.height);
        // if statement to forever loop the two ground images forever
        if(this.x < -this.width){
            this.x = 0;
        }
    }

    update(gameSpeed, frameTimeDelta){
        this.x -= gameSpeed * frameTimeDelta * this.speed * this.screenRatio;
    }

}
