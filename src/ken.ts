class Ken{
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

    public init = (): void => {
        this.reset();
        this.idleSprite = new AnimatedSprite(this.pos, 230, 17, atlas, "kenstand");
        this.sweepingSprite = new AnimatedSprite(this.pos, 242, 27, atlas, "kensweep");
        //this.blockingSprite = new AnimatedSprite(
        //this.deadSprite = new AnimatedSprite(
    }

    public reset = (): void => {
        this.pos = 895;
        this.hitboxWidth = 20;
        this.hitboxPos = this.pos - this.hitboxWidth;
        this.isSweeping = false;
        this.isBlocking = false;
        this.isDead = false;
    }

    public draw = (): void => {
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
    public update = (): void => {
        this.updateHitbox();
        this.updateSprites();
        this.checkAnimation();
    }

    public walkLeft = (): void => {
        if (ken.pos -2 >= ryu.pos +59){
            this.pos -= 2;
        }
    }

    public walkRight = (): void => {
       if (ken.pos +2 <= 910) {
        this.pos += 2;
       }
    }

    public checkAnimation = (): void => {
        if (this.sweepingSprite.isCompleted){
       this.isSweeping = false;
       this.sweepingSprite.isCompleted = false;
        }

    }

    public updateSprites = (): void => {
        this.idleSprite.x = this.pos;
        this.sweepingSprite.x = this.pos - 15;
      //  this.blockingSprite.x = this.pos;
       // this.deathSprite.x = this.pos;
    }

    public updateHitbox = (): void => {
        if(this.isSweeping){
            this.hitboxWidth = 29;
        }
        else{
            this.hitboxWidth = 0;
        }
        this.hitboxPos = this.pos - this.hitboxWidth;
    }

    public sweep = (): void => {
        this.isSweeping = true;
    }

    // public Block = (): void => {
    //     this.isBlocking = true;
    // }

    public die = (): void => {
        this.isDead = true;
    }
}