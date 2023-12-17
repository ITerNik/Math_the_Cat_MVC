const pic = document.querySelector<HTMLCanvasElement>('#graphics');
const ctx : CanvasRenderingContext2D = pic.getContext('2d');

const grid_size = 40;

let r = 4 * grid_size

setToDecart(ctx)

const num_lines_x = Math.floor(pic.height/grid_size / 2);

const num_lines_y = Math.floor(pic.width/grid_size / 2);

ctx.fillStyle = "rgba(0, 150, 0, .7)"

ctx.fillRect(0, 0, r, r)

ctx.beginPath()
ctx.moveTo(0, r / 2)
ctx.lineTo(-r / 2, 0)
ctx.lineTo(0, 0)
ctx.fill()

ctx.beginPath()
ctx.arc(0, 0, r, Math.PI, Math.PI * 3 / 2)
ctx.lineTo(0,0)
ctx.fill()

for (let i = -num_lines_x; i <= num_lines_x; i++) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000000"

    if (i == 0) {
        ctx.moveTo(-pic.width / 2, grid_size * i)
        ctx.lineTo(pic.width / 2, grid_size * i)
    } else {
        ctx.moveTo(-3, grid_size * i)
        ctx.lineTo(3, grid_size * i)
    }
    ctx.stroke()
}

for (let i = -num_lines_y; i <= num_lines_y; i++) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000000"

    if (i == 0) {

        ctx.moveTo(grid_size * i, -pic.height / 2)
        ctx.lineTo(grid_size * i, pic.height / 2)
    } else {
        ctx.moveTo(grid_size * i, -3);
        ctx.lineTo(grid_size * i, 3);
    }
    ctx.stroke()
}

ctx.scale(1, -1)
ctx.fillStyle = 'black'
ctx.font = 'bold 12px serif';
ctx.textAlign = 'start';
ctx.fillText(-4 + '', 8, grid_size * 4 + 3);

ctx.fillText(4 + '', -15, -grid_size * 4 + 3);

ctx.fillText(4 + '', grid_size * 4 , 15);

ctx.fillText(-4 + '',  -grid_size * 4 , -8);

function setToDecart(ctx : CanvasRenderingContext2D) : void {
    ctx.translate(pic.width / 2 , pic.height / 2)
    ctx.scale(1, -1)
}

function drawAxis(ctx : CanvasRenderingContext2D, dx : number, dy : number) : void {
    ctx.beginPath();
    ctx.moveTo(-dx, 0);
    ctx.lineTo(-dx+15, -10)
    ctx.moveTo(-dx+15, 10);
    ctx.lineTo(-dx, 0)
    ctx.lineTo(dx, 0);
    ctx.lineTo(dx-15, -10);
    ctx.moveTo(dx, 0);
    ctx.lineTo(dx-15, 10);

    ctx.moveTo(0, -dy);
    ctx.lineTo(-10, -dy+15);
    ctx.moveTo(10, -dy+15);
    ctx.lineTo(0, -dy);
    ctx.lineTo(0, dy);
    ctx.lineTo(-10, dy-15);
    ctx.moveTo(0, dy);
    ctx.lineTo(10, dy-15);

    ctx.lineJoin = 'round';
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.stroke();
}