var AnimatedSprite = (function () {
    function AnimatedSprite(x, y, frame_count, atlas, sequence_name) {
        var _this = this;
        this.x = 0;
        this.y = 0;
        this.frameCount = 0;
        this.sequenceName = "";
        this.isCompleted = false;
        this.delayFrame = 0;
        this.currentFrame = 0;
        this.draw = function () {
            if (_this.currentFrame > _this.frameCount) {
                _this.currentFrame = 0;
                _this.isCompleted = true;
            }
            if (_this.delayFrame <= 5) {
                _this.delayFrame++;
            }
            else {
                _this.currentFrame++;
                _this.delayFrame = 0;
            }
            ctx.save();
            ctx.translate(_this.x, _this.y);
            var key = _this.getFrameString();
            var frame = _this.atlas.frames[key];
            ctx.drawImage(_this.atlas.image, frame.x, frame.y, frame.w, frame.h, frame.ox, frame.oy, frame.w, frame.h);
            ctx.restore();
        };
        this.getFrameString = function () {
            if (_this.currentFrame > 9) {
                return _this.sequenceName + _this.currentFrame.toString() + ".png";
            }
            return _this.sequenceName + "0" + _this.currentFrame.toString() + ".png";
        };
        this.x = x;
        this.y = y;
        this.frameCount = frame_count;
        this.atlas = atlas;
        this.sequenceName = sequence_name;
    }
    return AnimatedSprite;
}());
var Frame = (function () {
    function Frame(x, y, w, h, ox, oy) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (w === void 0) { w = 1; }
        if (h === void 0) { h = 1; }
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.ox = ox;
        this.oy = oy;
    }
    Frame.prototype.set = function (x, y) {
        this.x = x;
        this.y = y;
    };
    return Frame;
}());
var KeyboardInput = (function () {
    function KeyboardInput() {
        var _this = this;
        this.keyCallback = {};
        this.keyDown = {};
        this.addKeycodeCallback = function (keycode, f) {
            _this.keyCallback[keycode] = f;
            _this.keyDown[keycode] = false;
        };
        this.keyboardDown = function (event) {
            if (_this.keyCallback[event.keyCode] != null) {
                event.defaultPrevented;
            }
            _this.keyDown[event.keyCode] = true;
        };
        this.keyboardUp = function (event) {
            _this.keyDown[event.keyCode] = false;
        };
        this.inputLoop = function () {
            for (var key in _this.keyDown) {
                var is_down = _this.keyDown[key];
                if (is_down) {
                    var callback = _this.keyCallback[key];
                    if (callback != null) {
                        callback();
                    }
                }
            }
        };
        document.addEventListener('keydown', this.keyboardDown);
        document.addEventListener('keyup', this.keyboardUp);
    }
    return KeyboardInput;
}());
var canvas;
var ctx;
var background = new Image();
background.src = "./assets/images/background.gif";
var img = new Image();
var keyInput;
var atlas;
var ryu;
var sprite2;
function gameLoop() {
    requestAnimationFrame(gameLoop);
    keyInput.inputLoop();
    ctx.drawImage(background, 250, 100);
    ryu.Update();
    ryu.Draw();
    sprite2.draw();
}
function walkLeftKen() {
    sprite2.x -= 2;
}
function walkRightKen() {
    sprite2.x += 2;
}
window.onload = function () {
    canvas = document.getElementById('cnvs');
    ctx = canvas.getContext("2d");
    keyInput = new KeyboardInput();
    atlas = new TextureAtlas("images/atlas.png", gameLoop);
    ryu = new Ryu();
    ryu.Init();
    sprite2 = new AnimatedSprite(895, 230, 8, atlas, "kenstand");
    keyInput.addKeycodeCallback(37, walkLeftKen);
    keyInput.addKeycodeCallback(39, walkRightKen);
    keyInput.addKeycodeCallback(65, ryu.WalkLeft);
    keyInput.addKeycodeCallback(68, ryu.WalkRight);
    keyInput.addKeycodeCallback(71, ryu.Sweep);
};
var Ryu = (function () {
    function Ryu() {
        var _this = this;
        this.pos = 0;
        this.hitboxWidth = 0;
        this.hitboxPos = 0;
        this.isSweeping = false;
        this.isBlocking = false;
        this.isDead = false;
        this.Init = function () {
            _this.Reset();
            _this.idleSprite = new AnimatedSprite(_this.pos, 230, 8, atlas, "ryustand");
            _this.sweepingSprite = new AnimatedSprite(_this.pos, 242, 13, atlas, "ryusweep");
        };
        this.Reset = function () {
            _this.pos = 315;
            _this.hitboxWidth = 20;
            _this.hitboxPos = _this.pos + _this.hitboxWidth;
            _this.isSweeping = false;
            _this.isBlocking = false;
            _this.isDead = false;
        };
        this.Draw = function () {
            if (_this.isSweeping) {
                _this.sweepingSprite.draw();
            }
            else if (_this.isBlocking) {
            }
            else if (_this.isDead) {
            }
            else {
                _this.idleSprite.draw();
            }
        };
        this.Update = function () {
            _this.UpdateHitbox();
            _this.UpdateSprites();
            _this.CheckAnimation();
        };
        this.WalkLeft = function () {
            _this.pos -= 2;
        };
        this.WalkRight = function () {
            _this.pos += 2;
        };
        this.CheckAnimation = function () {
            if (_this.sweepingSprite.isCompleted) {
                _this.isSweeping = false;
                _this.sweepingSprite.isCompleted = false;
            }
        };
        this.UpdateSprites = function () {
            _this.idleSprite.x = _this.pos;
            _this.sweepingSprite.x = _this.pos;
        };
        this.UpdateHitbox = function () {
            if (_this.isSweeping) {
                _this.hitboxWidth = 120;
            }
            else {
                _this.hitboxWidth = 20;
            }
            _this.hitboxPos = _this.pos + _this.hitboxWidth;
        };
        this.Sweep = function () {
            _this.isSweeping = true;
        };
        this.Block = function () {
            _this.isBlocking = true;
        };
        this.Die = function () {
            _this.isDead = true;
        };
    }
    return Ryu;
}());
var TextureAtlas = (function () {
    function TextureAtlas(atlasName, loadCallback) {
        var _this = this;
        this.frames = {};
        this.taLoadComplete = false;
        this.image = new Image();
        this.atlasName = "";
        this._imageFile = "";
        this._jsonFile = "";
        this._loadJSON = function () {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    _this.image.onload = _this.onImageLoad;
                    _this.image.onerror = _this.onImageError;
                    _this.image.src = _this._imageFile;
                    var json = JSON.parse(xhr.responseText);
                    _this._onRead(json);
                }
                else {
                    if (xhr.status != 0 && xhr.status != 200)
                        _this._onError(xhr);
                }
            };
            xhr.open("GET", _this._jsonFile, true);
            xhr.send();
        };
        this._onRead = function (data) {
            var temp_frame;
            for (var frame_name in data.frames) {
                var sprite_data = data.frames[frame_name];
                temp_frame = new Frame(sprite_data.frame.x, sprite_data.frame.y, sprite_data.frame.w, sprite_data.frame.h, sprite_data.spriteSourceSize.x, sprite_data.spriteSourceSize.y);
                _this.frames[frame_name] = temp_frame;
            }
        };
        this._onError = function (xhr) {
            console.log("FAILED TO LOAD ATLAS: ");
            console.dir(xhr);
        };
        this.onImageLoad = function () {
            _this.taLoadComplete = true;
            _this._loadCallback();
        };
        this.onImageError = function () {
            console.log("IMAGE LOAD ERROR");
        };
        this.containsFrame = function (frameName) {
            if (_this.frames[frameName] !== undefined &&
                _this.frames[frameName] !== null) {
                return true;
            }
            return false;
        };
        this.atlasName = atlasName;
        this._imageFile = atlasName;
        this._jsonFile = atlasName.replace(".png", "") + ".json";
        this._loadCallback = loadCallback;
        this._loadJSON();
    }
    return TextureAtlas;
}());
