var canvas;
var ctx;
var background = new Image();
background.src = "./assets/images/background.gif";
var playerone;
var x = 0;
var y = 0;
function gameloop() {
    requestAnimationFrame(gameloop);
    keyInput.inputLoop();
    ctx.drawImage(background, 250, 100);
    ctx.save();
    ctx.translate(x, y);
    ctx.drawImage(playerone, 250, 150);
    ctx.restore();
}
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
                event.preventDefault();
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
var keyInput;
window.onload = function () {
    canvas = document.getElementById('cnvs');
    ctx = canvas.getContext("2d");
    keyInput = new KeyboardInput();
    playerone = document.getElementById('playerone');
    keyInput.addKeycodeCallback(37, walkLeft);
    keyInput.addKeycodeCallback(39, walkRight);
    gameloop();
};
function walkLeft() {
    x -= 2;
}
function walkRight() {
    x += 2;
}
