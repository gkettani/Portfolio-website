import Ball from "./ball.js";
import Paddle from "./Paddle.js"; 
import {buildLevel, level1, level2, level3} from "./levels.js"
import InputHandler from "./input.js";


export default class Game{

    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.hasWon = false;
        this.hasLost = false;
        this.levels = [level1, level2, level3];

    }

    start(levelNum){
        this.hasWon = false;
        this.hasLost = false;
        this.ball = new Ball(this);
        this.paddle = new Paddle(this);
        let bricks = buildLevel(this, this.levels[levelNum]); 
        this.gameObjects = [this.ball, this.paddle, ...bricks];
        new InputHandler(this.paddle);
    }

    update(dt){
        if(!dt) return;
        this.gameObjects.forEach(obj => obj.update(dt));
        if (this.gameObjects.length <= 2) this.hasWon =true;
    }

    draw(ctx){
        this.gameObjects.forEach(obj => obj.draw(ctx));
    }
}
