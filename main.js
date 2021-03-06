var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AnimatedSprite = (function () {
    function AnimatedSprite(x, y, frame_count, atlas, sequence_name) {
        var _this = this;
        this.x = 0;
        this.y = 0;
        this.frameCount = 0;
        this.sequenceName = "";
        this.isCompleted = false;
        this.currentFrame = 0;
        this.draw = function () {
            if (_this.currentFrame > _this.frameCount) {
                _this.currentFrame = 0;
                _this.isCompleted = true;
            }
            _this.currentFrame++;
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
var Fighter = (function () {
    function Fighter() {
        var _this = this;
        this.pos = 0;
        this.idleWidth = 0;
        this.hitboxPos = 0;
        this.sweepingWidth = 0;
        this.sweepCorrection = 0;
        this.isSweeping = false;
        this.isBlocking = false;
        this.isDead = false;
        this.draw = function () {
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
        this.update = function () {
            _this.updateHitbox();
            _this.updateSprites();
            _this.checkAnimation();
        };
        this.checkAnimation = function () {
            if (_this.sweepingSprite.isCompleted) {
                _this.isSweeping = false;
                _this.sweepingSprite.isCompleted = false;
            }
        };
        this.updateSprites = function () {
            _this.idleSprite.x = _this.pos;
            _this.sweepingSprite.x = _this.pos - _this.sweepCorrection;
        };
        this.updateHitbox = function () {
            if (_this.isSweeping) {
                _this.hitboxPos = _this.pos + _this.sweepingWidth;
            }
            else {
                _this.hitboxPos = _this.pos + _this.idleWidth;
            }
        };
        this.sweep = function () {
            _this.isSweeping = true;
        };
        this.die = function () {
            _this.isDead = true;
        };
    }
    return Fighter;
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
var Ken = (function (_super) {
    __extends(Ken, _super);
    function Ken() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.init = function () {
            _this.reset();
            _this.idleSprite = new AnimatedSprite(_this.pos, 230, 17, atlas, "kenstand");
            _this.sweepingSprite = new AnimatedSprite(_this.pos, 242, 27, atlas, "kensweep");
            _this.idleWidth = 0;
            _this.sweepingWidth = -29;
            _this.sweepCorrection = -15;
        };
        _this.reset = function () {
            _this.pos = 880;
            _this.hitboxPos = _this.pos;
            _this.isSweeping = false;
            _this.isBlocking = false;
            _this.isDead = false;
        };
        _this.walkLeft = function () {
            if (_this.pos - 2 >= ryu.pos + ryu.idleWidth && !_this.isSweeping) {
                _this.pos -= 2;
            }
        };
        _this.walkRight = function () {
            if (_this.pos + 2 <= 900 && !_this.isSweeping) {
                _this.pos += 2;
            }
        };
        return _this;
    }
    return Ken;
}(Fighter));
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
var keyInput;
var atlas;
var ryu;
var ken;
var audio = new Audio();
audio.src = "./assets/music/bgm.mp3";
function gameLoop() {
    requestAnimationFrame(gameLoop);
    keyInput.inputLoop();
    ctx.drawImage(background, 250, 100);
    ryu.update();
    ken.update();
    ryu.draw();
    ken.draw();
    collision();
}
function collision() {
    ryu.isDead = false;
    ken.isDead = false;
    if (this.ryu.hitboxPos - ken.hitboxPos >= 0) {
        if (this.ryu.isSweeping && !this.ken.isBlocking) {
            if (!this.ken.isBlocking) {
                this.ken.die();
            }
        }
        if (this.ken.isSweeping && !this.ryu.isBlocking) {
            this.ryu.die();
        }
    }
    if (this.ryu.isDead || this.ken.isDead) {
        this.ken.reset();
        this.ryu.reset();
    }
}
window.onload = function () {
    canvas = document.getElementById('cnvs');
    ctx = canvas.getContext("2d");
    keyInput = new KeyboardInput();
    atlas = new TextureAtlas("images/atlas.png", gameLoop);
    ryu = new Ryu();
    ken = new Ken();
    ryu.init();
    ken.init();
    audio.load();
    audio.play();
    keyInput.addKeycodeCallback(37, ken.walkLeft);
    keyInput.addKeycodeCallback(39, ken.walkRight);
    keyInput.addKeycodeCallback(96, ken.sweep);
    keyInput.addKeycodeCallback(65, ryu.walkLeft);
    keyInput.addKeycodeCallback(68, ryu.walkRight);
    keyInput.addKeycodeCallback(71, ryu.sweep);
};
var Ryu = (function (_super) {
    __extends(Ryu, _super);
    function Ryu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.init = function () {
            _this.reset();
            _this.idleSprite = new AnimatedSprite(_this.pos, 230, 17, atlas, "ryustand");
            _this.sweepingSprite = new AnimatedSprite(_this.pos, 242, 27, atlas, "ryusweep");
            _this.idleWidth = 59;
            _this.sweepingWidth = 90;
        };
        _this.reset = function () {
            _this.pos = 330;
            _this.hitboxPos = _this.pos;
            _this.isSweeping = false;
            _this.isBlocking = false;
            _this.isDead = false;
        };
        _this.walkLeft = function () {
            if (_this.pos - 2 >= 300 && !_this.isSweeping) {
                _this.pos -= 2;
            }
        };
        _this.walkRight = function () {
            if (_this.pos + _this.idleWidth <= ken.pos && !_this.isSweeping) {
                _this.pos += 2;
            }
        };
        return _this;
    }
    return Ryu;
}(Fighter));
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
