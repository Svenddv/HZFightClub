class Ken extends Fighter {
    public init = (): void => {
        this.reset();
        this.idleSprite = new AnimatedSprite(this.pos, 230, 17, atlas, "kenstand");
        this.sweepingSprite = new AnimatedSprite(this.pos, 242, 27, atlas, "kensweep");
        this.idleWidth = 0;
        this.sweepingWidth = -29;
        this.sweepCorrection = -15;
        //this.blockingSprite = new AnimatedSprite(
        //this.deadSprite = new AnimatedSprite(
    }

    public reset = (): void => {
        this.pos = 880;
        this.hitboxPos = this.pos;
        this.isSweeping = false;
        this.isBlocking = false;
        this.isDead = false;
    }
     public walkLeft = (): void => {
        if (this.pos -2 >= ryu.pos + ryu.idleWidth && !this.isSweeping){
            this.pos -= 2;
        }
    }

    public walkRight = (): void => {
       if (this.pos +2 <= 900 && !this.isSweeping) {
        this.pos += 2;
       }
    }
    
}