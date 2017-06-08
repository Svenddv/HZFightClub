class AnimatedSprite {
    public x: number = 0;
    public y: number = 0;
    public frameCount: number = 0;
    public atlas: TextureAtlas;
    public sequenceName: string = "";
    public isCompleted: boolean = false;
    
    public delayFrame = 0;
    public currentFrame = 0;

    constructor(x: number, y: number, frame_count: number, atlas: TextureAtlas, sequence_name: string) {
        this.x = x;
        this.y = y;
        this.frameCount = frame_count;
        this.atlas = atlas;
        this.sequenceName = sequence_name;
    }

    public draw = (): void => {
        if (this.currentFrame > this.frameCount) {
            this.currentFrame = 0;
            this.isCompleted = true;
        }
        // if (this.delayFrame <= 1) {
        //     this.delayFrame++;            
        //     }
        // else {
        //     this.currentFrame++;
        //     this.delayFrame = 0;
        this.currentFrame++;    
    
        ctx.save();
        ctx.translate(this.x, this.y);
        let key = this.getFrameString();
        let frame = this.atlas.frames[key];
        ctx.drawImage(this.atlas.image,
            frame.x, frame.y,
            frame.w, frame.h,
            frame.ox, frame.oy,
            frame.w, frame.h);
        ctx.restore();
        
    }

    public getFrameString = (): string => {
        if (this.currentFrame > 9) {
            return this.sequenceName + this.currentFrame.toString() + ".png";
        }
        return this.sequenceName + "0" + this.currentFrame.toString() + ".png";
    }
}