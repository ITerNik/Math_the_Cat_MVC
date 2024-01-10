const mathForm: HTMLFormElement = document.querySelector<HTMLFormElement>('#math-form')
const inputX: NodeListOf<HTMLElement> = document.querySelector<HTMLElement>('.btn-bar')
    .querySelectorAll('label')
const inputY = document.getElementById('math-form:y') as HTMLInputElement
const inputR = document.getElementById('math-form:r') as HTMLInputElement

// const path = document.querySelector<HTMLElement>('#contextPathHolder').dataset.contextpath

const labelX: HTMLElement = document.querySelector('.btn-title')
const labelR: HTMLElement = document.querySelector("label[for='math-form:r']")
const labelY: HTMLElement = document.querySelector("label[for='math-form:y']")

interface ErrorMessage {
    empty: string,
    outRange?: string,
    nan?: string,
    default: string
}

const MESSAGES = new Map<string, ErrorMessage>([
    ['r', {
        empty: 'Пустовато тут',
        outRange: 'Почти от -3 до 3',
        nan: 'Откуда буквы?',
        default: 'Нацарапай число:'
    }], ['y', {
        empty: 'Пустовато тут',
        outRange: 'Может от -5 до 5?',
        nan: 'Чиселко надо',
        default: 'Нацарапай число:'
    }], ['x', {
        empty: 'Выбор сложен, но необходим',
        default: 'Тыкалки по X:'
    }]
])

const valid = new Map<string, boolean>([
    ['x', false],
    ['y', false],
    ['r', false]
])

mathForm.onsubmit = (event: SubmitEvent) => {
    validateInput(event)
}

window.onload = () => {
    inputX.forEach((label: HTMLElement) => {
        addClickTrigger(label)
    })
    // inputY.oninput = () =>  handleInput(inputY, labelY)
    inputR.oninput = () => {
        r = parseFloat(inputR.value);
        drawArea();
    } //handleInput(inputR, labelX)
}

function handleInput(input : HTMLInputElement, label: HTMLElement) : void {
    valid[input.name] = false
    if (input.value.length === 0) {
        hideWarning(label, MESSAGES.get(input.name).default)
        return
    }
    const num = parseFloat(input.value) // TODO regex instead of parse + parse commas
    if (isNaN(num)) {
        showWarning(label, MESSAGES.get(input.name).nan)
    } else if (Math.abs(num) >= parseInt(input.dataset.range)) {
        showWarning(label, MESSAGES.get(input.name).outRange)
    } else {
        hideWarning(label, MESSAGES.get(input.name).default)
        valid[input.name] = true
    }
    // drawPaw(parseFloat(inputX.value) * gridSize, parseFloat(inputY.value)  * -gridSize)
}

function addClickTrigger(btn: HTMLElement) : void {
    btn.onclick = (event : MouseEvent) => {
        if (event.target === btn) {
            if (btn.classList.contains('pressed')) btn.classList.remove('pressed')
            else btn.classList.add('pressed')
        }

        // TODO Add paw drawing
    }
}

function validateInput(event: SubmitEvent): void {
    event.preventDefault()

    if (inputY.value.length === 0) showWarning(labelY, MESSAGES.get(inputY.name).empty)
    // if (inputX.value.length === 0)  showWarning(labelX, MESSAGES.get(inputX.name).empty)
    if (!valid['x']) showWarning(labelR, MESSAGES.get('x').empty)

    if (valid['r'] && /*valid[inputX.name] &&*/ valid[inputY.name]) {

        $.post( '/images',
            { image : area.toDataURL()}
        )
        // mathForm.elements['r'].value = activeButton.value
        mathForm.submit()
    }
}

function showWarning(label: HTMLElement, text: string) : void {
    label.innerHTML = text
    label.classList.add('error')
}

function hideWarning(label: HTMLElement, text: string) : void {
    label.innerHTML = text
    label.classList.remove('error')
}