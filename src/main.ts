var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;
var background = new Image();
background.src = "./assets/images/background.gif";
var img: HTMLImageElement = new Image();
var keyInput: KeyboardInput;
var atlas: TextureAtlas;
var ryu: Ryu;
var ken: Ken;
var sprite2: AnimatedSprite;
var audio = new Audio();
audio.src = "./assets/music/bgm.mp3"

function gameLoop(): void {
    requestAnimationFrame(gameLoop);
    keyInput.inputLoop();
    ctx.drawImage(background,250,100);
    ryu.Update();
    ken.Update();
    ryu.draw();
    ken.draw();
    collision();
    
}

function collision(): void {
ryu.isDead = false;
ken.isDead = false;

if (this.ryu.hitboxPos - ken.hitboxPos >= 0) {  //means the hitboxes are on the wrong side of one another: they are colliding
    if (this.ryu.isSweeping && !this.ken.isBlocking){
        if(!this.ken.isBlocking){
            this.ken.Die();
            }
        }
    if (this.ken.isSweeping && !this.ryu.isBlocking){
            this.ryu.Die();
            }
        }
    if(this.ryu.isDead || this.ken.isDead){
        this.ken.Reset();
        this.ryu.Reset();
        }
    }

function WalkRight(): void{
    if (this.ryu.pos + 61 <= this.ken.pos){
        this.ryu.WalkRight();
    }
}

function WalkLeft(): void{
    if (this.ken.pos -2 >= this.ryu.pos + 59){
        this.ken.WalkLeft();
    }
}


window.onload = () => {
    canvas = <HTMLCanvasElement>document.getElementById('cnvs');
    ctx = canvas.getContext("2d");
    keyInput = new KeyboardInput();
    atlas = new TextureAtlas("images/atlas.png", gameLoop);
    ryu = new Ryu();
    ken = new Ken();
    ryu.Init();
    ken.Init();
    audio.load();
    audio.play();
    
   
    // PRESS LEFT ARROW KEY
    keyInput.addKeycodeCallback(37, this.WalkLeft);
   
    // PRESS RIGHT ARROW KEY
    keyInput.addKeycodeCallback(39, ken.WalkRight);

    // PRESS NUMPAD 0 KEY
    keyInput.addKeycodeCallback(96, ken.Sweep);
    
    // PRESS 'A' KEY
    keyInput.addKeycodeCallback(65, ryu.WalkLeft);
   
    // PRESS 'D' KEY
    keyInput.addKeycodeCallback(68, this.WalkRight);

    // PRESS 'G' KEY
    keyInput.addKeycodeCallback(71, ryu.Sweep);
    
};