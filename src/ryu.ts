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

    public init = (): void => {
        this.reset();
        this.idleSprite = new AnimatedSprite(this.pos, 230, 17, atlas, "ryustand");
        this.sweepingSprite = new AnimatedSprite(this.pos, 242, 27, atlas, "ryusweep");
        //todo this.blockingSprite = new AnimatedSprite(
        //todo this.deadSprite = new AnimatedSprite(
    }

    public reset = (): void => {
        this.pos = 315;
        this.hitboxWidth = 20;
        this.hitboxPos = this.pos + this.hitboxWidth;
        this.isSweeping = false;
        this.isBlocking = false;
        this.isDead = false;
    }

    public draw = (): void => {
        if( this.isSweeping){
            this.sweepingSprite.draw();
        }
        else if(this.isBlocking){
            //todo this.blockingSprite.draw();
        }
        else if(this.isDead){
            //todo this.deathSprite.draw();
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
        if (this.pos -2 >= 300) {
            this.pos -= 2;}
    }

    public walkRight = (): void => {
                if (this.pos +61 <= ken.pos) {
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
        this.sweepingSprite.x = this.pos;
      //todo this.blockingSprite.x = this.pos;
       //todo this.deathSprite.x = this.pos;
    }

    public updateHitbox = (): void => {
        if(this.isSweeping){
            this.hitboxWidth = 90;
        }
        else{
            this.hitboxWidth = 59;
        }
        this.hitboxPos = this.pos + this.hitboxWidth;
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