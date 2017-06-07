class Ryu{
    public pos: number = 0;
    public hitboxWidth: number = 0;
    public hitboxPos: number = 0;
    public isSweeping: boolean = false;
    public isBlocking: boolean = false;
    public isDead: boolean = false;
    idleSprite: AnimatedSprite;
    sweepingSprite: AnimatedSprite;
    blockingSprite: AnimatedSprite;
    deathSprite: AnimatedSprite;

    public Init = (): void => {
        this.Reset();
        this.idleSprite = new AnimatedSprite(this.pos, 230, 8, atlas, "ryustand");
        this.sweepingSprite = new AnimatedSprite(this.pos, this.pos, 13, atlas, "ryusweep");
        //this.blockingSprite = new AnimatedSprite(
        //this.deadSprite = new AnimatedSprite(
    }

    public Reset = (): void => {
        this.pos = 315;
        this.hitboxWidth = 20;
        this.hitboxPos = this.pos + this.hitboxWidth;
        this.isSweeping = false;
        this.isBlocking = false;
        this.isDead = false;
    }

    public Draw = (): void => {
        if( this.isSweeping){
            this.sweepingSprite.draw();
        }
        else if(this.isBlocking){
            //this.blockingSprite.draw();
        }
        else if(this.isDead){
            //this.deathSprite.draw();
        }
        else {
            this.idleSprite.draw();
        }
    }

    public Update = (): void => {
        this.UpdateHitbox();
        this.UpdateSprites();
    }

    public WalkLeft = (): void => {
        this.pos -= 2;
    }

    public WalkRight = (): void => {
        this.pos += 2;
    }

public UpdateSprites = (): void => {
        this.idleSprite.x = this.pos;
        this.sweepingSprite.x = this.pos;
      //  this.blockingSprite.x = this.pos;
       // this.deathSprite.x = this.pos;
    }

    public UpdateHitbox = (): void => {
        if(this.isSweeping){
            this.hitboxWidth = 120;
        }
        else{
            this.hitboxWidth = 20;
        }
        this.hitboxPos = this.pos + this.hitboxWidth;
    }

    public Sweep = (): void => {
        this.isSweeping = true;
    }

    public Block = (): void => {
        this.isBlocking = true;
    }

    public Die = (): void => {
        this.isDead = true;
    }
}