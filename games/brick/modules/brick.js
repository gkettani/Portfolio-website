export default class Brick{

    constructor(game, position){
        this.game = game;
        this.width = 114;
        this.height = 50;
        this.position ={
            x: position.x,
            y: position.y
        } 
    }

    draw(ctx){
        ctx.fillStyle = '#463F2A';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        ctx.strokeStyle = '#fff';
        ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(dt){
        
    }
}