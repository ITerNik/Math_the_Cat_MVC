const mathForm: HTMLFormElement = document.querySelector<HTMLFormElement>('#math-form')
const buttons: NodeListOf<HTMLButtonElement> = document.querySelector<HTMLElement>('.btn-bar')
    .querySelectorAll('button')
const inputY: HTMLInputElement = document.querySelector('#y')
const inputX: HTMLInputElement = document.querySelector('#x')

const path = document.querySelector<HTMLElement>('#contextPathHolder').dataset.contextpath

const labelR: HTMLElement = document.querySelector('.btn-title')
const labelX: HTMLElement = document.querySelector('label[for=x]')
const labelY: HTMLElement = document.querySelector('label[for=y]')

let activeButton : HTMLButtonElement = null

interface ErrorMessage {
    empty: string,
    outRange?: string,
    nan?: string,
    default: string
}

const MESSAGES = new Map<string, ErrorMessage>([
    [inputX.name, {
        empty: 'Пустовато тут',
        outRange: 'Почти от -3 до 3',
        nan: 'Откуда буквы?',
        default: 'Нацарапай число:'
    }], [inputY.name, {
        empty: 'Пустовато тут',
        outRange: 'Может от -5 до 5?',
        nan: 'Чиселко надо',
        default: 'Нацарапай число:'
    }], ['r', {
        empty: 'Выбор сложен, но необходим',
        default: 'Тыкалки по R:'
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
    buttons.forEach((btn: HTMLButtonElement) => {
        addClickTrigger(btn)
    })
    inputY.oninput = () =>  handleInput(inputY, labelY)
    inputX.oninput = () => handleInput(inputX, labelX)
}

function handleInput(input : HTMLInputElement, label: HTMLElement) : void {
    valid[input.name] = false
    if (input.value.length === 0) {
        hideWarning(label, MESSAGES.get(input.name).default)
        return
    }
    const num = parseFloat(input.value) // TODO: regex instead of parse + parse commas
    if (isNaN(num)) {
        showWarning(label, MESSAGES.get(input.name).nan)
    } else if (Math.abs(num) >= parseInt(input.dataset.range)) {
        showWarning(label, MESSAGES.get(input.name).outRange)
    } else {
        hideWarning(label, MESSAGES.get(input.name).default)
        valid[input.name] = true
    }
    drawPaw(parseFloat(inputX.value) * gridSize, parseFloat(inputY.value)  * -gridSize)
}

function addClickTrigger(btn: HTMLButtonElement) : void{
    btn.onclick = () => {
        if (activeButton) activeButton.classList.remove('pressed')
        btn.classList.add('pressed')
        activeButton = btn

        if (!valid['r']) {
            valid['r'] = true;
            hideWarning(labelR, MESSAGES.get('r').default)
        }

        r = parseInt(btn.value)
        drawArea()
    }
}

function validateInput(event: SubmitEvent): void {
    event.preventDefault()

    if (inputY.value.length === 0) showWarning(labelY, MESSAGES.get(inputY.name).empty)
    if (inputX.value.length === 0)  showWarning(labelX, MESSAGES.get(inputX.name).empty)
    if (!valid['r']) showWarning(labelR, MESSAGES.get('r').empty)

    if (valid['r'] && valid[inputX.name] && valid[inputY.name]) {

        $.post(path + '/images',
            { image : area.toDataURL()}
        )
        mathForm.elements['r'].value = activeButton.value
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