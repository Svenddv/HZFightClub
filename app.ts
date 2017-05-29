var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;

function gamestate() {
    requestAnimationFrame(gamestate);
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, 1280, 720);

}

window.onload = () => {
    canvas = <HTMLCanvasElement>document.getElementById('cnvs');
    ctx = canvas.getContext("2d");
    gamestate();
}
