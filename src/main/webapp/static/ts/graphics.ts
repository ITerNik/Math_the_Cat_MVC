const area: HTMLCanvasElement= document.querySelector('#math-area');
const container: HTMLElement = document.querySelector('.graphics-side')

const ctx : CanvasRenderingContext2D = area.getContext('2d');

const numLines: number = 11

const gridSize: number = area.width / numLines

let r : number =  0

function getCursorPosition(area, event): void {
    if (r === 0) return
    const rect = area.getBoundingClientRect()
    const x = (event.clientX - rect.left) / container.offsetWidth * numLines - numLines / 2
    const y = - (event.clientY - rect.top) / container.offsetHeight * numLines + numLines / 2
    inputY.value = y.toFixed(4)
    inputX.value = x.toFixed(4)
    handleInput(inputY, labelY)
    handleInput(inputX, labelX)
}

area.onclick = function(event) {
    getCursorPosition(area, event)
}

setToDecart(ctx)
drawArea()

function drawArea() {
    ctx.clearRect(-area.width / 2, -area.height / 2, area.width, area.height)
    ctx.scale(1, -1)

    const linesX = Math.floor(area.height / gridSize / 2);

    const linesY = Math.floor(area.width / gridSize / 2);

    ctx.fillStyle = "#8ECAE6"

    ctx.fillRect(0, 0, r, r)

    ctx.beginPath()
    ctx.moveTo(0, r / 2)
    ctx.lineTo(-r / 2, 0)
    ctx.lineTo(0, 0)
    ctx.fill()

    ctx.beginPath()
    ctx.arc(0, 0, r, Math.PI, Math.PI * 3 / 2)
    ctx.lineTo(0, 0)
    ctx.fill()

    for (let i = -linesX; i <= linesX; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000"

        if (i == 0) {
            ctx.moveTo(-area.width / 2, gridSize * i)
            ctx.lineTo(area.width / 2, gridSize * i)
        } else {
            ctx.moveTo(-3, gridSize * i)
            ctx.lineTo(3, gridSize * i)
        }
        ctx.stroke()
    }

    for (let i = -linesY; i <= linesY; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000"

        if (i == 0) {

            ctx.moveTo(gridSize * i, -area.height / 2)
            ctx.lineTo(gridSize * i, area.height / 2)
        } else {
            ctx.moveTo(gridSize * i, -3);
            ctx.lineTo(gridSize * i, 3);
        }
        ctx.stroke()
    }

    ctx.scale(1, -1)
    ctx.fillStyle = 'black'
    ctx.font = 'bold 12px serif';
    ctx.textAlign = 'start';
    ctx.fillText(-4 + '', 8, gridSize * 4 + 3);

    ctx.fillText(4 + '', -15, -gridSize * 4 + 3);

    ctx.fillText(4 + '', gridSize * 4, 15);

    ctx.fillText(-4 + '', -gridSize * 4, -8);
}

// const data: string = area.toDataURL('image/png')

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