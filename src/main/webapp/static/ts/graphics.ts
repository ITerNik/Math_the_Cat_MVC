const area: HTMLCanvasElement= document.querySelector('#math-area');
const container: HTMLElement = document.querySelector('.graphics-side')

const ctx : CanvasRenderingContext2D = area.getContext('2d');

const numLines: number = 11

const gridSize: number = area.width / numLines

const img = new Image()
img.src = '/static/assets/footprint.png'


let r : number =  0

function getCursorPosition(area, event): void {
    if (r === 0) return
    const rect = area.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const scaledX = x / container.offsetWidth * numLines - numLines / 2
    const scaledY = - y / container.offsetHeight * numLines + numLines / 2
    const imageX = x / container.offsetWidth * area.width - area.width / 2
    const imageY = y / container.offsetHeight * area.height - area.height / 2
    inputY.value = scaledY.toFixed(4)
    inputX.value = scaledX.toFixed(4)
    handleInput(inputY, labelY)
    handleInput(inputX, labelX)
    drawPaw(imageX, imageY)
}

area.onclick = function(event) {
    getCursorPosition(area, event)
}

ctx.font
ctx.font = 'normal 44px fantasy';
ctx.textAlign = 'center';

setToDecart(ctx)
drawArea()

function drawPaw(dx: number, dy: number) : void {
    if (isNaN(dx) || isNaN(dy) || r === 0) return
    drawArea()
    ctx.drawImage(img, dx - 25, dy - 25, 50, 50)
}

function drawArea() {
    ctx.scale(1, -1)
    ctx.clearRect(-area.width / 2, -area.height / 2, area.width, area.height)
    const linesX = Math.floor(area.height / gridSize / 2);

    const linesY = Math.floor(area.width / gridSize / 2);

    let scaledR = r * gridSize

    ctx.lineWidth = 10
    ctx.strokeStyle = "#219EBC"
    ctx.fillStyle = "#8ECAE6"

    ctx.beginPath()
    ctx.moveTo(0, scaledR)
    ctx.lineTo(scaledR, scaledR)
    ctx.lineTo(scaledR, 0)
    ctx.lineTo(0, 0)
    ctx.lineTo(0, -scaledR)
    ctx.arcTo(-scaledR, -scaledR, -scaledR,  0, scaledR)
    ctx.lineTo(-scaledR / 2, 0)
    ctx.lineTo(-scaledR / 2, 0)
    ctx.lineTo(0, scaledR / 2)
    ctx.closePath()

    ctx.fill()
    ctx.stroke()

    ctx.lineWidth = 3;
    ctx.strokeStyle = "#023047"

    for (let i = -linesX; i <= linesX; i++) {
        ctx.beginPath();

        if (i == 0) {
            ctx.moveTo(-area.width / 2, gridSize * i)
            ctx.lineTo(area.width / 2, gridSize * i)
        } else {
            ctx.moveTo(-10, gridSize * i)
            ctx.lineTo(10, gridSize * i)
        }
        ctx.stroke()
    }

    for (let i = -linesY; i <= linesY; i++) {
        ctx.beginPath();

        if (i == 0) {
            ctx.moveTo(gridSize * i, -area.height / 2)
            ctx.lineTo(gridSize * i, area.height / 2)
        } else {
            ctx.moveTo(gridSize * i, -10);
            ctx.lineTo(gridSize * i, 10);
        }
        ctx.stroke()
    }

    ctx.scale(1, -1)

    let markR = r === 0 ? 5 : r

    ctx.fillStyle = "#219EBC"

    ctx.fillText('- ' + markR, 50, markR * gridSize + 10);

    ctx.fillText(markR + '', -40, -markR * gridSize + 10);

    ctx.fillText(markR + '', markR * gridSize, 60);

    ctx.fillText('- ' + markR, -markR * gridSize - 10, -25);
}

function setToDecart(ctx : CanvasRenderingContext2D) : void {
    ctx.translate(area.width / 2 , area.height / 2)
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