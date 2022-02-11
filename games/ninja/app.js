document.addEventListener('DOMContentLoaded', () =>{
    const grid = document.querySelector('.grid');
    const doodler = document.createElement('div');
    const btn = document.getElementById('start')
    const scoreCounter = document.getElementById('scoreCount')
    let doodlerLeftSpace;
    let startPoint = 95;
    let doodlerBottomSpace;
    let gameStarted = false;
    let platformNumber = 6;
    let platforms = [];
    let upTimerId;
    let downTimerId;
    let isJumping = false;
    let isGoingLeft = false;
    let isGoingRight = false;
    let leftTimerId; 
    let rightTimerId;
    let moveId;
    let score;
    let mySound;

    function createDoodler(){
        doodlerBottomSpace = startPoint
        grid.appendChild(doodler);
        doodler.classList.add('doodler');
        doodlerLeftSpace = platforms[0].left
        doodler.style.left = doodlerLeftSpace + 'px';
        doodler.style.bottom = doodlerBottomSpace + 'px';

    }

    class sound {
        constructor(src) {
            this.sound = document.createElement("audio");
            this.sound.src = src;
            this.sound.setAttribute("preload", "auto");
            this.sound.setAttribute("controls", "none");
            this.sound.style.display = "none";
            document.body.appendChild(this.sound);
            this.play = function () {
                this.sound.play();
            };
            this.stop = function () {
                this.sound.pause();
            };
        }
    }
    

    class Platform{
        constructor(newPlatformBottom){
            this.bottom = newPlatformBottom;
            this.left = Math.random() * 315;
            this.visual = document.createElement('div');

            const visual = this.visual;
            visual.classList.add('platform');
            visual.style.left = this.left + 'px'
            visual.style.bottom = this.bottom + 'px'
            grid.appendChild(visual);
        }
    }

    function createPlatform() {
        for(let i=0; i<platformNumber; i++)
        {
            let platformGap = 600 / platformNumber;
            let newPlatformBottom = 100 + i * platformGap;
            let newPlatform = new Platform(newPlatformBottom);
            platforms.push(newPlatform);
        }
    }

    function movePlatforms() {
        if (doodlerBottomSpace > 200 && platforms.length != 0)
        {
            platforms.forEach(platform => {
                platform.bottom -= 4*(doodlerBottomSpace/250)
                let visual = platform.visual
                if (platform.bottom >= 0){
                    visual.style.bottom = platform.bottom + 'px'
                }else {
                    visual.remove()
                }
            })
        }

        if (platforms.length != 0 && platforms[0].bottom < 0)
        {
            platforms.shift();
            score++
            scoreCounter.innerHTML = score
            if (doodlerBottomSpace < 500 || platforms[platforms.length-1].bottom < 500){
                let newPlatForm = new Platform(600)
                platforms.push(newPlatForm)
            }
            
        }
    }

    const jump = () =>{
        clearInterval(downTimerId)
        mySound[Math.floor(Math.random()*4)].play()
        isJumping = true
        let i = doodlerBottomSpace > 300 ? 10 : 17
        upTimerId = setInterval(function() {
            doodlerBottomSpace += i
            i--
            doodler.style.bottom = doodlerBottomSpace + 'px'
            if (i <= 0 || doodlerBottomSpace > 450){
                fall()
            }
        }, 30)
    }

    function fall() {
        clearInterval(upTimerId)
        isJumping = false;
        let i = 0
        downTimerId = setInterval(function(){
            i = Math.min(++i, 15)
            doodlerBottomSpace -= i
            doodler.style.bottom = doodlerBottomSpace + 'px'
            if (doodlerBottomSpace <= 0)
            {
                gameOver()
            }
            platforms.forEach(platform => {
                if (
                    (doodlerBottomSpace >= platform.bottom ) &&
                    (doodlerBottomSpace <= platform.bottom + 15) &&
                    ((doodlerLeftSpace + 60) >= platform.left) &&
                    (doodlerLeftSpace <= (platform.left + 85)) &&
                    doodlerBottomSpace <= 300 &&
                    !isJumping
                ){
                    jump()
                }
            })
        }, 30)
    }

    function control(e) {
        if (e.key === "ArrowLeft" && !isGoingLeft){
            moveLeft()
        }
        else if( e.key === "ArrowRight" && !isGoingRight)
        {
            moveRight()
        }
    }

    function moveLeft(){
        isGoingLeft = true
        leftTimerId = setInterval(function () {
            if (doodlerLeftSpace >= 0)
            {
                doodlerLeftSpace -= 7
                doodler.style.left = doodlerLeftSpace + 'px'
            }else{
                doodlerLeftSpace = 380 
                doodler.style.left = doodlerLeftSpace + 'px'
            }
        }, 20)
    }

    function moveRight(){
        isGoingRight = true
        rightTimerId = setInterval(function () {
            if (doodlerLeftSpace <= 380)
            {
                doodlerLeftSpace += 7
                doodler.style.left = doodlerLeftSpace + 'px'
                
            }else{
                doodlerLeftSpace = 0
                doodler.style.left = doodlerLeftSpace + 'px'
            }
        }, 20)
    }

    function stopMoving(){
        if(isGoingLeft) {
            clearInterval(leftTimerId)
            isGoingLeft = false
        }
        if (isGoingRight){
            clearInterval(rightTimerId)
            isGoingRight = false
        }
    }

    function gameOver(){
        console.log('Game Over')
        gameStarted = false
        grid.removeChild(doodler)
        platforms.forEach(platform => {
            grid.removeChild(platform.visual)
        });
        platforms.splice(0, platforms.length)
        clearInterval(upTimerId)
        clearInterval(downTimerId)
        clearInterval(moveId)
        btn.innerHTML = 'Play Again'
        btn.style.visibility = "visible";
        
    }

    function start(){
        btn.style.visibility = "hidden";
        if ( !gameStarted)
        {
            mySound = [new sound("../sounds/bounce1.mp3"), new sound("../sounds/bounce2.mp3"), 
                        new sound("../sounds/bounce3.mp3"), new sound("../sounds/bounce4.mp3")];
            score = 0
            scoreCounter.innerHTML = score
            gameStarted = true
            createPlatform();
            createDoodler();
            moveId = setInterval(movePlatforms, 20);
            jump()
            document.addEventListener('keydown', control)
            document.addEventListener("keyup", stopMoving);
        }
    }
    btn.addEventListener('click', start);
})