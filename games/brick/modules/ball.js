export default class Ball{

    constructor(game){
        this.game = game;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.radius = 18;
        this.speed = {
            x: 5,
            y: 5
        }

        this.position = {
            x: this.gameWidth / 2 ,
            y: this.gameHeight - this.radius - 42
        };

    }

    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.position.x,  this.position.y , this.radius , 0, Math.PI*2);
        ctx.fillStyle = "#004433";
        ctx.fill();
        ctx.closePath();
    }

    update(dt){
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        // Wall on left or right
        if(this.position.x >= this.gameWidth - this.radius 
            || this.position.x <= this.radius)
        {
            this.speed.x = -this.speed.x;
        }

        // Wall on top or bottom
        if(this.position.y >= this.gameHeight - this.radius 
            || this.position.y <= this.radius)
        {
            this.speed.y = -this.speed.y;
        }

        // check collision with paddle
        if(this.position.y + this.radius > this.game.paddle.position.y 
            && this.position.x >= this.game.paddle.position.x
            && this.position.x <= this.game.paddle.position.x + this.game.paddle.width)
        {
            this.speed.y = -this.speed.y;
        }
        else if (this.position.y + this.radius > this.game.paddle.position.y )
        {
            this.game.hasLost = true;
        }

        // check collision with bricks
        let i=2;
        let hit = false;
        while( !hit && i < this.game.gameObjects.length)
        {
            let brick = this.game.gameObjects[i];
            if(this.checkCollsion(brick))
            {
                this.speed.y *= -1;
                hit = true;
                this.game.gameObjects.splice(i, 1);
            }
            i++;
        }
    }

    checkCollsion(object){
        if ((this.position.y - this.radius <= object.position.y + object.height
            ||this.position.y + this.radius <= object.position.y)
            && this.position.x >= object.position.x 
            && this.position.x <= object.position.x + object.width)
        {
            return true;
        }
        return false;
    }
} 