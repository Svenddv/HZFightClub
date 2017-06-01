var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;
var background = new Image();
background.src = "./assets/images/background.gif";
var playerone: HTMLImageElement;
var x: number = 0;
var y: number = 0;


// class Point {
//     public x: number= 0;
//     public y: number= 0;
//     constructor(x: number = 0, y: number = 0) {
//         this.x = x;
//         this.y = y;
//     }
// }

function gameloop() {
    requestAnimationFrame(gameloop);
    keyInput.inputLoop();
    ctx.drawImage(background,250,100);
    ctx.save();
    ctx.translate(x, y);
    ctx.drawImage(playerone, 250, 150);
    ctx.restore();
}

interface iShape {
    draw(): void;
    x: number;
    y: number;
    color: string;
    lineWidth: number;
}

class KeyboardInput {
    public keyCallback: { [keycode: number]: () => void; } = {};
    public keyDown: { [keycode: number]: boolean; } = {};
    constructor() {
        document.addEventListener('keydown', this.keyboardDown);
        document.addEventListener('keyup', this.keyboardUp);
    }

    public addKeycodeCallback = (keycode: number, f: () => void): void => {
        this.keyCallback[keycode] = f;
        this.keyDown[keycode] = false;
    }

    public keyboardDown = (event: KeyboardEvent): void => {
        if (this.keyCallback[event.keyCode] != null) {
            event.preventDefault();
        }
        this.keyDown[event.keyCode] = true;
    }

    public keyboardUp = (event: KeyboardEvent): void => {
        this.keyDown[event.keyCode] = false;
    }

    public inputLoop = (): void => {
        for (var key in this.keyDown) {
            var is_down: boolean = this.keyDown[key];

            if (is_down) {
                var callback: () => void = this.keyCallback[key];
                if (callback != null) {
                    callback();
                }
            }
        }
    }
}




var keyInput: KeyboardInput;






window.onload = () => {
   
    canvas = <HTMLCanvasElement>document.getElementById('cnvs');
    ctx = canvas.getContext("2d");
    keyInput = new KeyboardInput();
    playerone = <HTMLImageElement>document.getElementById('playerone') 
   
    // PRESS LEFT ARROW OR 'A' KEY
    keyInput.addKeycodeCallback(37, walkLeft);
   
    // PRESS RIGHT ARROW OR 'D' KEY
    keyInput.addKeycodeCallback(39, walkRight);
    
    gameloop();
}

function walkLeft(): void {
    x -= 2;
}

function walkRight(): void {
    x += 2;
}
