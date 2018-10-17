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
        this.setImage("ann.png");
        this.x = 48;
        this.y = 300;
        this.speed = 0;
        this.speedWhenWalking = 125;
        
    }
}