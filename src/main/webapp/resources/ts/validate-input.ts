const mathForm: HTMLFormElement = document.querySelector<HTMLFormElement>('#math-form')

const inputY: NodeListOf<HTMLInputElement> = document.querySelector<HTMLElement>('.btn-bar')
    .querySelectorAll('input[type=text]')
const inputR = document.getElementById('math-form:r') as HTMLInputElement
const messages: HTMLElement = document.querySelector('#message-container')


const labelX: HTMLElement = document.querySelector('.btn-title')
const labelR: HTMLElement = document.querySelector("label[for='math-form:r']")
const labelY: HTMLElement = document.querySelector("label[for='math-form:y']")


mathForm.onsubmit = (event: SubmitEvent) => {
    validateInput(event)
}

window.onload = () => {
    inputX.forEach((btn: HTMLInputElement, index: number) => {
        btn.onclick = () => pressLabel(btn, index)
        btn.labels[0].onclick = () => drawPointFromLabel(index)
    })
    inputY.forEach((input, index) => {
        input.oninput = () => {
            const scaledX = (labelValues[index] + numLines / 2) * container.offsetWidth / numLines
            const scaledY = (-parseFloat(input.value) + numLines / 2) * container.offsetWidth / numLines
            redrawPoint(scaledX, scaledY, index)
        }
    })
    inputR.oninput = () => {
        r = parseFloat(inputR.value);
        drawArea(area)
    }
}

function displayErrors() {
    popup.innerHTML = messages.innerHTML
    popup.classList.remove('invisible');
    setTimeout(() => {
        popup.classList.add('invisible');
    }, 3000)
}

function showSuccess() {
    popup.innerHTML = 'Запрос отправлен успешно'
    popup.classList.remove('invisible');
    setTimeout(() => {
        popup.classList.add('invisible');
    }, 3000)
}

function pressLabel(btn: HTMLInputElement, index: number) : void {
    const label: HTMLLabelElement = btn.labels[0]
        label.classList.toggle('hidden')
        inputY[index].classList.toggle('hidden')
}

function validateInput(event: SubmitEvent): void {
    event.preventDefault()

    if (pointsCounter !== pointsData.size) popup.innerText = "Многовато точек.\n Некоторые не попадают в область X"
    else mathForm.submit()
}