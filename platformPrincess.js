import { game, Sprite } from "./sgc/sgc.js";
game.setBackground("water.png", 500, 0);

let Wall = new Sprite();
    Wall.name = "A wall";
    Wall.setImage("wall.png");
    Wall.x = 0;
    Wall.y = 175;
    Wall.accelerateOnBounce = false;

class Support extends Sprite {
    constructor(x, y, image){
        super();
        this.x = x;
        this.y = y;
        this.setImage(image);
        
    }
}
class Platform extends Support {
    constructor(x, y, image){
        super(x, y, image);
        this.name = "A platform";
        this.accelerateOnBounce = false;
    }
}
let startPlatform = new Platform();
    startPlatform.x = 0;
    startPlatform.y = 400;
    startPlatform.setImage("start.png");
    
let finishPlatform = new Platform();
    finishPlatform.x = game.displayWidth - 48 * 2;
    finishPlatform.y = 400;
    finishPlatform.setImage("finish.png");
    
class Slider extends Support{
    constructor(x, y, angle){
        super(x, y, "slider.png");
        this.name = "A sliding support";
        this.angle = angle;
        this.speed = 48;
    }
}

new Slider(startPlatform.x + 48 * 3, startPlatform.y + 48, 0);
new Slider(finishPlatform.x - 48 * 5, finishPlatform.y + 48, 180);

class Princess extends Sprite{
    constructor(){
        super();
        this.setImage("ann.png");
        this.x = 48;
        this.y = 300;
        this.speed = 0;
        this.speedWhenWalking = 125;
        this.defineAnimation("right", 3, 5);
        this.defineAnimation("left", 9 ,11);
        this.isFalling = false;
    }
    handleLeftArrowKey(){
        this.angle = 180;
        this.speed = this.speedWhenWalking;
    }
    handleRightArrowKey(){
        this.angle = 0;
        this.speed = this.speedWhenWalking;
    }
    handleGameLoop(){
        if(this.angle===0 && this.speed>0){
            this.playAnimation("right");
        }
        if(this.angle===180 && this.speed>0){
            this.playAnimation("left");
        }
        this.x = Math.max(5, this.x);
        this.isFalling = false; //assume she is falling unless proven otherwise
        //Check directly below the princess for supports
        let supports = game.getSpritesOverlapping(this.x, this.y + this.height, this.width, 1, Support);
        //Is there none, or is its *top* above the bottom of the ptincess?
        if(supports.length === 0 || supports[0].y < this.y + this.height){
            this.isFalling = true; //she is falling so...
            this.y = this.y + 4; //simulate gravity
        }
    }
    handleSpacebar(){
        if (!this.isFalling) {
        this.y = this.y - 1.25 * this.height; // jump
        }
    }
    handleBoundaryContact(){
        game.end('Princess Ann has drowned.\n\nBetter luck next time.');
    }
}
let ann = new Princess();

class Door extends Sprite{
    constructor(){
        super();
        this.setImage("door.png");
        this.x = game.displayWidth - 48;
        this.y = finishPlatform.y - 2 * 48;
        this.accelerateOnBounce = false;
    }
    handleCollision(otherSprite){
        if(otherSprite === ann){
            game.end('Congratulations!\n\nPrincess Ann can now pursue the\nstranger deeper into the castle!');
        }
    }
}