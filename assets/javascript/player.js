export default class Player {
    constructor(){
        // sets image
        this.playerImage = new Image();
        this.playerImage.src = './assets/images/Witchcraft_spr_4.png';
        this.image = this.playerImage;
        // sprite size
        this.spriteW = 24;
        this.spriteH = 24;
        this.width = this.spriteW;
        this.height = this.spriteH;
        // sprite positioning
        this.x = 20;
        this.y = 20;
        // frames for animation
        this.minFrame = 0;
        this.maxFrame = 21;
    }
    draw(){
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    update(){}
}