import Game from './modules/game.js'

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
let isFinished = true;
let game = new Game(GAME_WIDTH, GAME_HEIGHT);
let levelNum = 0;
let lastTime = 0;
ctx.font = '48px serif';
ctx.fillText('Press enter to start', GAME_WIDTH/2-180, GAME_HEIGHT/2);

function gameLoop(timestamp){
    let dt = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    game.update(dt);
    game.draw(ctx);
    if (game.hasWon) {
        isFinished = true;
        levelNum++
        levelNum = levelNum > 2 ? 0 : levelNum;
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        ctx.font = '48px serif';
        ctx.fillStyle = '#000';
        ctx.fillText('Press enter to start', GAME_WIDTH/2-150, GAME_HEIGHT/2-25);
        ctx.fillText('the next level', GAME_WIDTH/2-100, GAME_HEIGHT/2+25);
    }
    else if (game.hasLost){
        isFinished = true;
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        ctx.font = '48px serif';
        ctx.fillStyle = '#000';
        ctx.fillText('You lost', GAME_WIDTH/2-100, GAME_HEIGHT/2-25);
        ctx.fillText('Press enter to try again', GAME_WIDTH/2-210, GAME_HEIGHT/2+25);
    }
    else{
        requestAnimationFrame(gameLoop);
    } 
}


document.addEventListener('keydown', (event) => {
    if (event.key === "Enter" && isFinished)
    {
        isFinished = false;
        game.start(levelNum);
        gameLoop();
    }
});


