const form: HTMLElement = document.querySelector('#input_form');
const inputY: Input = document.querySelector('#y_coordinate');
const inputR: Input = document.querySelector('#r_coordinate');
const inputWarningY: HTMLElement = document.querySelector('#invalid-y');
const inputWarningR: HTMLElement = document.querySelector('#invalid-r');
const inputWarningX: HTMLElement = document.querySelector('#invalid-x');
const inputForm : HTMLFormElement = document.querySelector('#input_form');


type Input = HTMLInputElement | null

const EMPTY_INPUT_WARN: string = 'Тлен и пустота не вариант';
const NAN_INPUT_WARN: string = 'Мы тут считаем, а не читаем';


form.onsubmit = function(event: Event): void {
    event.preventDefault();

    let valid: boolean = checkIfValidText(inputR, inputWarningR);
    valid = checkIfValidText(inputY, inputWarningY) && valid;

    const inputX: Input = document.querySelector('input[name=x_coordinate]:checked');
    valid = checkIfValidRadio(inputX, inputWarningX) && valid;

    if (valid) {
        $.ajax({type: $(this).attr('method'),
            url: $(this).attr('action'),
            data : $(this).serialize(),
            success : (data) => {
                $("#result-table").html(data)
            }
        });
    }
};


function insertWarning(text: string, warning: HTMLElement): void {
    warning.classList.remove('hide');
    warning.innerHTML = text;
}

function checkIfValidText(input: Input, tag: HTMLElement): boolean {
    const num: number = parseFloat(input.value);
    const minRange: number = parseInt(input.dataset.min);
    const maxRange: number = parseInt(input.dataset.max);
    if (input.value.length === 0) {
        insertWarning(EMPTY_INPUT_WARN, tag);
        return false;
    }
    if (isNaN(num)) {
        insertWarning(NAN_INPUT_WARN, tag);
        return false;
    }
    if (num < minRange || num > maxRange) {
        insertWarning(`Котьки умеют только от ${minRange} до ${maxRange}`, tag);
        return false;
    }
    tag.classList.add('hide');
    return true;
}

function checkIfValidRadio(input: Input, tag: HTMLElement): boolean {
    if (input) {
        tag.classList.add('hide');
        return true;
    } else {
        insertWarning(EMPTY_INPUT_WARN, tag);
        return false;
    }
}
