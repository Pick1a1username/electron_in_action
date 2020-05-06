const request = require('request').defaults({
    url: 'https://cliphub.glitch.me/clippings',
    headers: { 'User-Agent': 'Clipmaster 9000' },
    json: true,
});

const { clipboard, ipcRenderer, shell } = require('electron');

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

/**
 * 
 * @param {String} clipping 
 */
const publishClipping = (clipping) => {
    //  curl -v -X POST \
    // -H 'User-Agent: Clipmaster 9000' \
    // -H 'Content-Type: application/json' \
    // -d '{ "clipping": "text" }' \
    // https://cliphub.glitch.me/clippings
    request.post({ json: { clipping } }, (error, response, body) => {
        if (error) return new Notification(
            'Error Publishing Your Clipping',
            { body: JSON.parse(error).message }
        );

        const url = body.url;
        const notification = new Notification(
            'Your Clipping Has Been Published',
            { body: `Click to open ${url} in your browser.` }
        );

        notification.onclick = () => { shell.openExternal(url); };

        clipboard.writeText(url);
    });
};

copyFromClipboardButton.addEventListener('click', addClippingToList);

clippingsList.addEventListener('click', (event) => {
    const hasClass = className => event.target.classList.contains(className);
    
    const clippingListItem = getButtonParent(event);

    if (hasClass('remove-clipping')) removeClipping(clippingListItem);
    if (hasClass('copy-clipping')) writeToClipboard(getClippingText(clippingListItem));
    if (hasClass('publish-clipping')) publishClipping(getClippingText(clippingListItem));
});

ipcRenderer.on('create-new-clipping', () => {
    addClippingToList();
    new Notification(
        'Clipping Added',
        { body: clipboard.readText() }
    );
});

ipcRenderer.on('write-to-clipboard', () => {
    // We don't know which clipping the user want,
    // so grab the first one.
    const clipping = clippingsList.firstChild;
    writeToClipboard(getClippingText(clipping));
});

ipcRenderer.on('publish-clipping', () => {
    // We don't know which clipping the user want,
    // so grab the first one.
    const clipping = clippingsList.firstChild;
    publishClipping(getClippingText(clipping));
})