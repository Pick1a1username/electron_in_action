const { clipboard } = require('electron');

const clippingsList = document.getElementById('clippings-list');
const copyFromClipboardButton = document.getElementById('copy-from-clipboard');

const addClippingToList = () => {
    const clippingText = clipboard.readText();
    const clippingElement = createClippingElement(clippingText);
    clippingsList.prepend(clippingElement);
};

const createClippingElement = (clippingText) => {
    const clippingElement = document.createElement('article');

    clippingElement.classList.add('clipping-list-item');

    clippingElement.innerHTML = `
        <div class="clipping-text" disabled="true"></div>
        <div class="clipping-controls">
            <button class="copy-clipping">&rarr; Clipboard</button>
            <button class="publish-clipping">Publish</button>
            <button class="remove clipping">Remove</button>
        </div>
    `;

    // This is for escaping the input...
    clippingElement.querySelector('.clipping-text').innerText = clippingText;

    return clippingElement;
}

copyFromClipboardButton.addEventListener('click', addClippingToList);