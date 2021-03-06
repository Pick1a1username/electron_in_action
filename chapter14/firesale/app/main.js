const fs = require('fs');

const { app, BrowserWindow, dialog, Menu } = require('electron');

const createApplicationMenu = require('./application-menu');

const windows = new Set();
const openFiles = new Map();
// This is not in the textbook. This will be used instead of browserWindow.isDocumentEdited()
const windowCustomProperties = exports.windowCustomProperties = new Map();

const openFile = exports.openFile = (targetWindow, file) => {
    const content = fs.readFileSync(file).toString();
    app.addRecentDocument(file); // This doesn't seem to be needed for Linux.
    targetWindow.setRepresentedFilename(file); // This is only for MacOS.

    // This is not in the textbook. This will be used instead of browserWindow.setRepresentedFilename() for Windows and Linux.
    targetWindowCustomProperties = windowCustomProperties.get(targetWindow);
    windowCustomProperties.set(targetWindow, { ...targetWindowCustomProperties, representedFilename: file});

    targetWindow.webContents.send('file-opened', file, content);
    startWatchingFile(targetWindow, file);
    createApplicationMenu(windowCustomProperties);
};

const getFileFromUser = exports.getFileFromUser = (targetWindow) => {
    const files = dialog.showOpenDialog(targetWindow, {
        properties: ['openFile'],
        filters: [
            { name: 'Text Files', extensions: ['txt'] },
            { name: 'Markdown Files', extensions: ['md', 'markdown'] }
        ]
    });

    files.then( files => {
        if (files.filePaths[0]) openFile(targetWindow, files.filePaths[0]);
    })
};

const saveHtml = exports.saveHtml = (targetWindow, content) => {
    const file = dialog.showSaveDialog(targetWindow, {
        title: 'Save HTML',
        defaultPath: app.getPath('documents'),
        filters: [
            { name: 'HTML Files', extensions: ['html', 'htm'] }
        ]
    });

    file.then( file => {
        if (file.filePath) fs.writeFileSync(file.filePath, content);
    });
};

const saveMarkdown = exports.saveMarkdown = (targetWindow, file, content) => {
    if (!file) {
        file = dialog.showSaveDialog(targetWindow, {
            title: 'Save Markdown',
            defaultPath: app.getPath('documents'),
            filters: [
                { name: 'Markdown Files', extensions: ['md', 'markdown'] }
            ]
        });
    }

    file.then( file => {
        if (file.filePath) fs.writeFileSync(file.filePath, content);
        openFile(targetWindow, file);
    });
}

const createWindow = exports.createWindow = () => {
    let x, y;

    const currentWindow = BrowserWindow.getFocusedWindow();

    if (currentWindow) {
        const [ currentWindowX, currentWindowY ] = currentWindow.getPosition();
        x = currentWindowX + 10;
        y = currentWindowY + 10;
    }
    
    let newWindow = new BrowserWindow({ 
        x, y,
        show: false,
        webPreferences: {
            nodeIntegration: true
            }
        });

    newWindow.loadFile('./app/index.html');

    newWindow.once('ready-to-show', () => {
        newWindow.show();
    });

    newWindow.on('focus', () => createApplicationMenu(windowCustomProperties));

    newWindow.on('closed', () => {
        windows.delete(newWindow);
        stopWatchingFile(newWindow);
        createApplicationMenu(windowCustomProperties);
        newWindow = null;
    });

    newWindow.on('close', (event) => {
        if (newWindow.isDocumentEdited() || windowCustomProperties.get(newWindow).documentEdited ) {
            event.preventDefault();

            const result = dialog.showMessageBoxSync(newWindow, {
                type: 'warning',
                title: 'Quit with Unsaved Changes?',
                message: 'Your changes will be lost if you do not save.',
                buttons: [
                    'Quit Anyway',
                    'Cancel',
                ],
                defaultId: 0,
                cancelId: 1
            });

            if (result === 0) {
                windowCustomProperties.delete(newWindow);
                newWindow.destroy();
                return;
            }
        } else {
            windowCustomProperties.delete(newWindow);
        }
    })

    windows.add(newWindow);
    windowCustomProperties.set(newWindow, {});
    return newWindow;
}

const startWatchingFile = (targetWindow, file) => {
    stopWatchingFile(targetWindow);

    const watcher = fs.watchFile(file, (curr, prev) => {
        if (curr.ino !== 0) {
            const content = fs.readFileSync(file).toString();
            targetWindow.webContents.send('file-changed', file, content);
        }
    });

    openFiles.set(targetWindow, watcher);
}

const stopWatchingFile = (targetWindow) => {
    if (openFiles.has(targetWindow)) {
        openFiles.get(targetWindow).stop();
        openFiles.delete(targetWindow);
    }
}

app.on('ready', () => {
    createApplicationMenu(windowCustomProperties);
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform === 'darwin') return false;
    app.quit();
});

app.on('activate', (event, hasVisibleWindows) => {
    if (!hasVisibleWindows) createWindow();
});

app.on('will-finish-launching', () => {
    app.on('open-file', (event, file) => {
        const win = createWindow();
        win.once('ready-to-show', () => {
            openFile(win, file);
        });
    });
});