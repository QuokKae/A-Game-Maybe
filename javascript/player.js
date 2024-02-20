export default class Player {
    constructor(ctx, width, height, minJumpH, maxJumpH, screenRatio){
        // sets image
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.minJumpH = minJumpH;
        this.maxJumpH = maxJumpH;
        this.screenRatio = screenRatio;
        this.playerImage = new Image();
        this.playerImage.src = './assets/images/Witchcraft_spr_4.png';
        this.image = this.playerImage;
        // sprite size
        this.width = width;
        this.height = height;
        // sprite positioning
        this.x = 20 * screenRatio;
        this.y = this.canvas.height - this.height - 5;
        // frames for animation
        this.minFrame = 0;
        this.maxFrame = 21;
    }
    draw(){
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    update(){}
}
