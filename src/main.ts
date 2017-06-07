var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;
var background = new Image();
background.src = "./assets/images/background.gif";
var img: HTMLImageElement = new Image();
var keyInput: KeyboardInput;
var atlas: TextureAtlas;
var ryu: Ryu;
var sprite2: AnimatedSprite;

function gameLoop(): void {
    requestAnimationFrame(gameLoop);
    keyInput.inputLoop();
    ctx.drawImage(background,250,100);
    ryu.Update();
    ryu.Draw();
    sprite2.draw();
    
}

// function walkLeft(): void {
//     ryu.pos -= 2;
// }

// function walkRight(): void {
//     ryu.pos += 2;
// }

function walkLeftKen(): void {
    sprite2.x -= 2;
}

function walkRightKen(): void {
    sprite2.x += 2;
}

window.onload = () => {
    canvas = <HTMLCanvasElement>document.getElementById('cnvs');
    ctx = canvas.getContext("2d");
    keyInput = new KeyboardInput();
    atlas = new TextureAtlas("images/atlas.png", gameLoop);
    ryu = new Ryu();
    ryu.Init();
    sprite2 = new AnimatedSprite(895, 230, 8, atlas, "kenstand");
   
    // PRESS LEFT ARROW KEY
    keyInput.addKeycodeCallback(37, walkLeftKen);
   
    // PRESS RIGHT ARROW KEY
    keyInput.addKeycodeCallback(39, walkRightKen);
    
    // PRESS 'A' KEY
    keyInput.addKeycodeCallback(65, ryu.WalkLeft);
   
    // PRESS 'D' KEY
    keyInput.addKeycodeCallback(68, ryu.WalkRight);

    // PRESS 'G' KEY
    keyInput.addKeycodeCallback(71, ryu.Sweep);
    
};