export default class InputHandler{
    
    constructor(paddle){
        document.addEventListener('keydown', event =>{
            if(event.key === "ArrowLeft")
            {
                paddle.moveLeft();

            }
            else if(event.key === "ArrowRight")
            {
                paddle.moveRight();    
            }
        });

        document.addEventListener('keyup', event =>{
            if(event.key === "ArrowLeft")
            {
                if (paddle.speed < 0)
                    paddle.stop();

            }
            else if(event.key === "ArrowRight")
            {
                if (paddle.speed > 0)
                    paddle.stop();
            }
        });
    }
}