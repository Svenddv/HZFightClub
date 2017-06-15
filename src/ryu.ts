class Ryu extends Fighter {
    public init = (): void => {
        this.reset();
        this.idleSprite = new AnimatedSprite(this.pos, 230, 17, atlas, "ryustand");
        this.sweepingSprite = new AnimatedSprite(this.pos, 242, 27, atlas, "ryusweep");
        this.idleWidth = 59;
        this.sweepingWidth = 90;   
        //this.blockingSprite = new AnimatedSprite(
        //this.deadSprite = new AnimatedSprite(
    }

    public reset = (): void => {
        this.pos = 330;
        this.hitboxPos = this.pos;
        this.isSweeping = false;
        this.isBlocking = false;
        this.isDead = false;
    }
     public walkLeft = (): void => {
        if (this.pos -2 >= 300 && !this.isSweeping){
            this.pos -= 2;
        }
    }

    public walkRight = (): void => {
       if (this.pos + this.idleWidth <= ken.pos && !this.isSweeping) {
        this.pos += 2;
       }
    }
    
}