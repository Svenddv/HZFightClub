class Fighter {
    public pos: number = 0;
    public idleWidth: number = 0;
    public hitboxPos: number = 0;
    public sweepingWidth: number = 0;
    public sweepCorrection: number = 0;
    public isSweeping: boolean = false;
    public isBlocking: boolean = false;
    public isDead: boolean = false;
    idleSprite: AnimatedSprite;
    sweepingSprite: AnimatedSprite;
    blockingSprite: AnimatedSprite;
    deathSprite: AnimatedSprite;

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

    public checkAnimation = (): void => {
        if (this.sweepingSprite.isCompleted){
       this.isSweeping = false;
       this.sweepingSprite.isCompleted = false;
        }

    }

    public updateSprites = (): void => {
        this.idleSprite.x = this.pos;
        this.sweepingSprite.x = this.pos - this.sweepCorrection;
      //  this.blockingSprite.x = this.pos;
       // this.deathSprite.x = this.pos;
    }

    public updateHitbox = (): void => {
        if(this.isSweeping){
            this.hitboxPos = this.pos + this.sweepingWidth;
        }
        else{
            this.hitboxPos = this.pos + this.idleWidth;
        }
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