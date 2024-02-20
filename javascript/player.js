export default class Player {

    jumpPressed = false;
    jumpInProgress = false;
    falling = false;
    jump_speed = 0.6;
    gravity = 0.4;

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
        this.yStand = this.y;
        // frames for animation
        this.minFrame = 0;
        this.maxFrame = 21;

        // keyboard inputs
        this.keydown = this.keydown.bind(this);
        this.keyup = this.keyup.bind(this);

        window.removeEventListener('keydown', this.keydown);
        window.removeEventListener('keyup', this.keyup);

        window.addEventListener('keydown', this.keydown);
        window.addEventListener('keyup', this.keyup);
    }

    keydown = (event)=>{
        if(event.code === "Space" || "ArrowUp" || "KeyW"){
            this.jumpPressed = true;
        }
    }

    keyup = (event)=>{
        if(event.code === "Space" || "ArrowUp" || "KeyW"){
            this.jumpPressed = false;
        }
    }

    draw(){
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    update(frameTimeDelta){
        this.jump(frameTimeDelta);
    }
    
    jump(frameTimeDelta){
        if(this.jumpPressed){
            this.jumpInProgress = true;
        }

        if(this.jumpInProgress && !this.falling){
            if(this.y > this.canvas.height - this.minJumpH || 
                (this.y > this.canvas.height - this.maxJumpH && this.jumpPressed)){
                    this.y -= this.jump_speed * frameTimeDelta * this.screenRatio
                }
            else{
                this.falling = true;
            }
        }
        else{
            if(this.y < this.yStand){
                this.y += this.gravity * frameTimeDelta * this.screenRatio;
                if(this.y + this.height > this.canvas.height){
                    this.y = this.yStand;
                }
            }
            else {
                this.falling = false;
                this.jumpInProgress = false;
            }
        }
    }
}
