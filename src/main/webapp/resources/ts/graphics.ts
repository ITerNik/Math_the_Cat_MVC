const area: HTMLCanvasElement= document.querySelector('#math-area');
const axisArea: HTMLCanvasElement= document.querySelector('#axis-area');
const container: HTMLElement = document.querySelector('.graphics-container')
const img : HTMLImageElement = document.querySelector('#footprint-image-container')
const popup : HTMLDivElement = document.querySelector('.popup-error')
const menu : HTMLElement = document.querySelector('.top-menu')
const inputX: NodeListOf<HTMLInputElement> = document.querySelector<HTMLElement>('.btn-bar')
    .querySelectorAll('input[type=checkbox]')
const labelValues: number[] = []

inputX.forEach( box => labelValues.push(parseFloat(box.labels[0].textContent)))

document.onscroll = () => {
    popup.classList.toggle('stuck', menu.getBoundingClientRect().top < -60)
}

const ctx : CanvasRenderingContext2D = area.getContext('2d');
const axisCtx : CanvasRenderingContext2D = axisArea.getContext('2d');

const numLines: number = 11

const gridSize: number = area.width / numLines

let r : number =  0


const pointsData : Map<number, HTMLImageElement> = new Map<number, HTMLImageElement>()
let pointsCounter: number = 0;

function getCursorPosition(area : HTMLElement, event: MouseEvent): [number, number] {
    const rect = area.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    return [x, y]
}

container.onclick = function(event) {
    const [x, y] = getCursorPosition(container, event)
    const scaledX = Math.round((x / container.offsetWidth * numLines - numLines / 2) * 10) / 10
    const index = labelValues.indexOf(scaledX)

    if (event.target instanceof HTMLElement) {
        if (event.target.classList.contains('point')) {
            removePoint(event.target)
        } else if (index !== -1) {
            redrawPoint(x, y, index)
            inputY[index].value = (- y / container.offsetHeight * numLines + numLines / 2).toFixed(2)
        } else {
            drawPoint(x, y)
        }
    }
}

function removePoint(point: HTMLElement) {
    point.remove()
    pointsCounter--
}

function clearPoints() {
    const points: NodeListOf<HTMLImageElement> = document.querySelectorAll('.point')
    points.forEach(point => point.click())
    inputR.value = '0.0'
    inputR.dispatchEvent(new Event('input'))
}

function redrawPoint(x: number, y :number, index: number) {
    let point : HTMLImageElement
    if (pointsData.has(labelValues[index])) {
        point  = pointsData.get(labelValues[index])
    } else {
        point = createPoint()
        point.style.filter = 'sepia(1)'
        point.onclick = () => {
            inputX[index].click()
            pointsData.delete(labelValues[index])
        }
        inputX[index].click()
    }

    appendPoint(point, x, y)

    pointsData.set(labelValues[index], point)
}

function drawPoint(x : number, y: number) {
    const point: HTMLImageElement = createPoint()
    appendPoint(point, x, y)
}

function createPoint() : HTMLImageElement {
    const point: HTMLImageElement = document.createElement('img')
    point.src = img.src
    point.classList.add('point')
    pointsCounter++

    return point
}

function appendPoint(point: HTMLImageElement, x: number, y: number) {
    point.style.transform = `rotate(${getRandomAngle(-90, 90)}deg)`
    point.style.top = `${y / container.offsetHeight * 100 - 1.5}%`
    point.style.left = `${x / container.offsetWidth * 100 - 1.5}%`

    container.append(point)
}

function drawPointFromLabel(index: number) {
    let point : HTMLImageElement = createPoint()
    point.style.filter = 'sepia(1)'
    point.onclick = () => {
        inputX[index].click()
        pointsData.delete(x)
    }

    const x = labelValues[index]
    const scaledY =  numLines / 2 * container.offsetHeight / numLines
    const scaledX = (x + numLines / 2) * container.offsetWidth / numLines
    appendPoint(point, scaledX, scaledY)

    pointsData.set(x, point)
}

function getRandomAngle(from: number, to: number) : number {
    return Math.random() * (to - from) + from
}

ctx.font
ctx.font = 'normal 44px fantasy';
ctx.textAlign = 'center';


setToDecart(ctx)
setToDecart(axisCtx)

drawAxis(axisCtx)
drawArea(area)

function drawArea(area : HTMLCanvasElement) {
    const ctx: CanvasRenderingContext2D = area.getContext('2d')
    setToDecart(ctx)
    clearAll(ctx)
    let markR = 5

    if (r >= 2 && r <= 5) {
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
        ctx.arcTo(-scaledR, -scaledR, -scaledR, 0, scaledR)
        ctx.lineTo(-scaledR / 2, 0)
        ctx.lineTo(-scaledR / 2, 0)
        ctx.lineTo(0, scaledR / 2)
        ctx.closePath()

        ctx.fill()
        ctx.stroke()

        markR = r
    }

    ctx.scale(1, -1)

    ctx.fillStyle = "#219EBC"

    ctx.fillText('- ' + markR.toFixed(1), 50, markR * gridSize + 10);

    ctx.fillText(markR.toFixed(1) + '', -40, -markR * gridSize + 10);

    ctx.fillText(markR.toFixed(1) + '', markR * gridSize, 60);

    ctx.fillText('- ' + markR.toFixed(1), -markR * gridSize - 10, -25);
}

function setToDecart(ctx : CanvasRenderingContext2D) : void {
    ctx.resetTransform();
    ctx.translate(area.width / 2 , area.height / 2)
    ctx.scale(1, -1)
}

function drawAxis(ctx : CanvasRenderingContext2D) : void {
    setToDecart(ctx)
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#023047"

    const linesX = Math.floor(area.height / gridSize / 2);
    const linesY = Math.floor(area.width / gridSize / 2);

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

    for (let i = 0; i < labelValues.length; i++) {
        const line : HTMLDivElement = document.createElement('div')
        line.classList.add('navigation-line')
        line.style.left = `${50 + gridSize * labelValues[i] / area.width * 100 - 0.4}%`
        container.append(line)
    }
}

function clearAll(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(-area.width / 2, -area.height / 2, area.width, area.height)
}