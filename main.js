var canvas;
var ctx;
function gamestate() {
    requestAnimationFrame(gamestate);
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, 1280, 720);
}
window.onload = function () {
    canvas = document.getElementById('cnvs');
    ctx = canvas.getContext("2d");
    gamestate();
};
