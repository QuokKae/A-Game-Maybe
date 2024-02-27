export default class Score {
    score = 0;
    high_score = "highScore";

    constructor(ctx, screenRatio) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.screenRatio = screenRatio;
    }

    update(frameTimeDelta) {
      this.score += frameTimeDelta * 0.01;
    }

    reset() {
        this.score = 0;
    }

    setHighScore() {
        const highScore = Number(localStorage.getItem(this.high_score));
        if (this.score > highScore) {
        localStorage.setItem(this.high_score, Math.floor(this.score));
        }
    }

    draw() {
        const highScore = Number(localStorage.getItem(this.high_score));
        const y = 15;

        const fontSize = 1;
        this.ctx.font = `${fontSize}rem "Pixelify Sans"`;
        this.ctx.fillStyle = "darkgreen";
        const scoreX = this.canvas.width - 75;
        const highScoreX = scoreX - 180;

        const scorePadded = Math.floor(this.score).toString().padStart(6, 0);
        const highScorePadded = highScore.toString().padStart(6, 0);

        this.ctx.fillText(scorePadded, scoreX, y);
        this.ctx.fillText(`highest ${highScorePadded}`, highScoreX, y);
        }
    }