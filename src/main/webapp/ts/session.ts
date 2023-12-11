const listElement: HTMLElement = document.getElementById('history-list');

render();

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
}