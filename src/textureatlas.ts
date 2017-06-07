class TextureAtlas {
    public frames: { [index: string]: Frame } = {};
    public taLoadComplete: boolean = false;
    public image: HTMLImageElement = new Image();
    public atlasName: string = "";
    private _imageFile: string = "";
    private _jsonFile: string = "";
    private _loadCallback: () => void;

    constructor(atlasName: string, loadCallback: () => void) {
        this.atlasName = atlasName;
        this._imageFile = atlasName;
        this._jsonFile = atlasName.replace(".png", "") + ".json";

        this._loadCallback = loadCallback;
        this._loadJSON();

    }

    protected _loadJSON = () => {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                this.image.onload = this.onImageLoad;
                this.image.onerror = this.onImageError;
                this.image.src = this._imageFile;
                let json = JSON.parse(xhr.responseText);
                this._onRead(json);
            }
            else {
                if (xhr.status!=0 && xhr.status != 200)
                    this._onError(xhr);
            }
        };
        xhr.open("GET", this._jsonFile, true);
        xhr.send();
    }

    protected _onRead = (data: any) => {

        var temp_frame: Frame;

        for (var frame_name in data.frames) {
            // console.log("Frame name: " + frame_name);
            var sprite_data: any = data.frames[frame_name];

            temp_frame = new Frame(sprite_data.frame.x,
                sprite_data.frame.y,
                sprite_data.frame.w,
                sprite_data.frame.h,
                sprite_data.spriteSourceSize.x,
                sprite_data.spriteSourceSize.y,
                );

            this.frames[frame_name] = temp_frame;
        }

    }
    protected _onError = (xhr: XMLHttpRequest) => {
        console.log("FAILED TO LOAD ATLAS: " );
        console.dir(xhr);
    }

    private onImageLoad = () => {
        // console.log("onImageLoad");
        this.taLoadComplete = true;
        this._loadCallback();
    }

    private onImageError = () => {
        console.log("IMAGE LOAD ERROR");
    }

    public containsFrame = (frameName: string): boolean => {
        if (this.frames[frameName] !== undefined &&
            this.frames[frameName] !== null) {
            return true;
        }
        return false;
    }
}