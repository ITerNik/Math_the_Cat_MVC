const listElements: NodeListOf<HTMLElement> = document.querySelectorAll('.toggle-header')

window.onload = () => {
    listElements.forEach((elem : HTMLElement) => {
        addToggleTrigger(elem)
    })
}

function addToggleTrigger(elem: HTMLElement) {
    elem.onclick = (event) => {
        if (elem.classList.contains('toggled')) {
            elem.classList.remove('toggled')
            showToggled(elem)
        } else {
            elem.classList.add('toggled')
            hideToggled(elem)
        }
    }
}

function showToggled(header: HTMLElement) {
    const body = header.nextElementSibling as HTMLElement;
    body.classList.remove('visible')
}

function hideToggled(header: HTMLElement) {
    const body = header.nextElementSibling as HTMLElement;
    body.classList.add('visible')
}

/*
function render(): void {
    const listItems: NodeListOf<HTMLElement> = listElement.querySelectorAll('li');

    for (let i = 0; i < listItems.length; ++i) {
        const item: HTMLElement = listItems[i];
        item.onclick = function(event: Event): void {
            if (item.className === 'toggled') {
                item.classList.remove('toggled');
                toggleContent(item, '+');
            } else {
                item.classList.add('toggled');
                toggleContent(item, '-');
            }
        };
    }
}

function toggleContent(item: HTMLElement, action: string) {
    const header: HTMLElement = item.querySelector('.toggle-show');
    const content: Element = item.nextElementSibling;
    if (action === '+') {
        content.classList.add('hidden');
    } else {
        content.classList.remove('hidden');
    }
    header.innerHTML = action;
}*/
