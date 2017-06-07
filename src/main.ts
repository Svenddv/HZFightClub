var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;
var background = new Image();
background.src = "./assets/images/background.gif";
var img: HTMLImageElement = new Image();
var keyInput: KeyboardInput;
var atlas: TextureAtlas;
var sprite: AnimatedSprite;
var sprite2: AnimatedSprite;

function gameLoop(): void {
    requestAnimationFrame(gameLoop);
    keyInput.inputLoop();
    ctx.drawImage(background,250,100);
    sprite.draw();
    sprite2.draw();
}

function walkLeft(): void {
    if (sprite.x -2 >= 300) { 
        sprite.x -= 2;}
}

function walkRight(): void {
    if (sprite.x + 2 <= sprite2.x) {
         sprite.x += 2; }

}

function walkLeftKen(): void {
    if (sprite2.x -2 >= sprite.x) {
        sprite2.x -= 2;}
}

function walkRightKen(): void {
    if (sprite2.x +2 <= 910) {
        sprite2.x += 2;}
}

window.onload = () => {
    canvas = <HTMLCanvasElement>document.getElementById('cnvs');
    ctx = canvas.getContext("2d");
    keyInput = new KeyboardInput();
    atlas = new TextureAtlas("images/atlas.png", gameLoop);
    sprite = new AnimatedSprite(315, 230, 8, atlas, "ryustand");
    sprite2 = new AnimatedSprite(895, 230, 8, atlas, "kenstand");
   
    // PRESS LEFT ARROW KEY
    keyInput.addKeycodeCallback(37, walkLeftKen);
   
    // PRESS RIGHT ARROW KEY
    keyInput.addKeycodeCallback(39, walkRightKen);
    
    // PRESS 'A' KEY
    keyInput.addKeycodeCallback(65, walkLeft);
   
    // PRESS 'D' KEY
    keyInput.addKeycodeCallback(68, walkRight);
    
};