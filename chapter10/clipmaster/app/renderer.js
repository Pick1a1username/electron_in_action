const { clipboard } = require('electron');

const clippingsList = document.getElementById('clippings-list');
const copyFromClipboardButton = document.getElementById('copy-from-clipboard');

const addClippingToList = () => {
    const clippingText = clipboard.readText();
    const clippingElement = createClippingElement(clippingText);
    clippingsList.prepend(clippingElement);
};

/**
 * 
 * @param {String} clippingText 
 */
const createClippingElement = (clippingText) => {
    const clippingElement = document.createElement('article');

    clippingElement.classList.add('clipping-list-item');

    clippingElement.innerHTML = `
        <div class="clipping-text" disabled="true"></div>
        <div class="clipping-controls">
            <button class="copy-clipping">&rarr; Clipboard</button>
            <button class="publish-clipping">Publish</button>
            <button class="remove-clipping">Remove</button>
        </div>
    `;

    // This is for escaping the input...
    clippingElement.querySelector('.clipping-text').innerText = clippingText;

    return clippingElement;
}

/**
 * 
 * @param {Event} param0 
 */
const getButtonParent = ({ target }) => {
    return target.parentNode.parentNode;
};

/**
 * 
 * @param {Node} clippingListItem 
 */
const getClippingText = (clippingListItem) => {
    return clippingListItem.querySelector('.clipping-text').innerText;
};

/**
 * 
 * @param {Node} target 
 */
const removeClipping = (target) => {
    target.remove();
}

/**
 * 
 * @param {String} clippingText 
 */
const writeToClipboard = (clippingText) => {
    clipboard.writeText(clippingText);
}

copyFromClipboardButton.addEventListener('click', addClippingToList);

clippingsList.addEventListener('click', (event) => {
    const hasClass = className => event.target.classList.contains(className);
    
    const clippingListItem = getButtonParent(event);

    if (hasClass('remove-clipping')) removeClipping(clippingListItem);
    if (hasClass('copy-clipping')) writeToClipboard(getClippingText(clippingListItem));
    if (hasClass('publish-clipping')) console.log('Publish clipping'
    );
});