export default class Player {
    walk_timer = 200;
    walk_animation = this.walk_timer;

    spriteWalkImages = [];

    jumpPressed = false;
    jumpInProgress = false;
    falling = false;
    jump_speed = 4;
    gravity = 3;
    running = true;
    frameIndex = 0;
    

    constructor(ctx, width, height, minJumpH, maxJumpH, screenRatio){
        // sets canvas
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        // jump height
        this.minJumpH = minJumpH;
        this.maxJumpH = maxJumpH;
        // screen ratio
        this.screenRatio = screenRatio;
        // sets static avatar
        this.staticImage = new Image();
        this.staticImage.src = './assets/images/avatar/walk/a0.png';
        this.image = this.staticImage;
        // sprite size
        this.width = width;
        this.height = height;
        // sprite positioning
        this.posX = 20 * screenRatio;
        this.posY = this.canvas.height - this.height - 22;
        this.yStand = this.posY;

        // player walk animation images
        const playerAni1 = new Image();
        playerAni1.src = './assets/images/avatar/walk/a1.png'
        const playerAni2 = new Image();
        playerAni2.src = './assets/images/avatar/walk/a2.png'
        const playerAni3 = new Image();
        playerAni3.src = './assets/images/avatar/walk/a3.png'
        const playerAni4 = new Image();
        playerAni4.src = './assets/images/avatar/walk/a4.png'
        const playerAni5 = new Image();
        playerAni5.src = './assets/images/avatar/walk/a5.png'
        // pushes animation images to spriteWalkImages array
        this.spriteWalkImages.push(playerAni1);
        this.spriteWalkImages.push(playerAni2);
        this.spriteWalkImages.push(playerAni3);
        this.spriteWalkImages.push(playerAni4);
        this.spriteWalkImages.push(playerAni5);

        // keyboard inputs
        window.removeEventListener('keydown', this.keydown);
        window.removeEventListener('keyup', this.keyup);

        window.addEventListener('keydown', this.keydown);
        window.addEventListener('keyup', this.keyup);
    }


    // keyboard keypress events
    keydown = (event)=>{
        if(event.code === "Space" || event.code === "ArrowUp" || event.code === "KeyW"){
            this.jumpPressed = true;
        }
    }
    keyup = (event)=>{
        if(event.code === "Space" || event.code === "ArrowUp" || event.code === "KeyW" ){
            this.jumpPressed = false;
        }
    }
    // creates player spirite
    draw(gameSpeed, frameTimeDelta){
        if(this.running){
            if(this.frameIndex >= this.spriteWalkImages.length){
                this.frameIndex = 0;
            }
            this.image = this.spriteWalkImages[this.frameIndex];
            this.frameIndex++;
            // this.walk_animation -= frameTimeDelta * gameSpeed; //makes sure animation runs same rate no matter the refresh rate.
        }
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }

    // updates player sprite
    update(frameTimeDelta){
        this.jump(frameTimeDelta);
    }
    

    jump(frameTimeDelta){
        if(this.jumpPressed){
            this.jumpInProgress = true;
        }
        if(this.jumpInProgress && !this.falling){
            if(this.posY > this.canvas.height - this.minJumpH || 
                (this.posY > this.canvas.height - this.maxJumpH && this.jumpPressed)){
                    this.posY -= this.jump_speed * frameTimeDelta * this.screenRatio
                }
            else{
                this.falling = true;
            }
        }
        else{
            if(this.posY < this.yStand){
                this.posY += this.gravity * frameTimeDelta * this.screenRatio;
                if(this.posY + this.height > this.canvas.height){
                    this.posY = this.yStand;
                }
            }
            else {
                this.falling = false;
                this.jumpInProgress = false;
            }
        }
    }
}
