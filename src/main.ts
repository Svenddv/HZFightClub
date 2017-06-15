var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;
var background = new Image();
background.src = "./assets/images/background.gif";
var img: HTMLImageElement = new Image();
var keyInput: KeyboardInput;
var atlas: TextureAtlas;
var ryu: Ryu;
var ken: Ken;
var audio = new Audio();
audio.src = "./assets/music/bgm.mp3"

function gameLoop(): void {
    requestAnimationFrame(gameLoop);
    keyInput.inputLoop();
    ctx.drawImage(background,250,100);
    ryu.update();
    ken.update();
    ryu.draw();
    ken.draw();
    collision();
    
}

function collision(): void {
ryu.isDead = false;
ken.isDead = false;

if (this.ryu.hitboxPos - ken.hitboxPos >= 0) {  // means the hitboxes are on the wrong side of one another: they are colliding
    if (this.ryu.isSweeping && !this.ken.isBlocking){
        if(!this.ken.isBlocking){
            this.ken.die();
            }
        }
    if (this.ken.isSweeping && !this.ryu.isBlocking){
            this.ryu.die();
            }
        }
    if(this.ryu.isDead || this.ken.isDead){
        this.ken.reset();
        this.ryu.reset();
        }
    }
    

window.onload = () => {
    canvas = <HTMLCanvasElement>document.getElementById('cnvs');
    ctx = canvas.getContext("2d");
    keyInput = new KeyboardInput();
    atlas = new TextureAtlas("images/atlas.png", gameLoop);
    ryu = new Ryu();
    ken = new Ken();
    ryu.init();
    ken.init();
    audio.load();
    audio.play();
    
   
    // PRESS LEFT ARROW KEY
    keyInput.addKeycodeCallback(37, ken.walkLeft);
   
    // PRESS RIGHT ARROW KEY
    keyInput.addKeycodeCallback(39, ken.walkRight);

    // PRESS NUMPAD 0 KEY
    keyInput.addKeycodeCallback(96, ken.sweep);
    
    // PRESS 'A' KEY
    keyInput.addKeycodeCallback(65, ryu.walkLeft);
   
    // PRESS 'D' KEY
    keyInput.addKeycodeCallback(68, ryu.walkRight);

    // PRESS 'G' KEY
    keyInput.addKeycodeCallback(71, ryu.sweep);
    
};