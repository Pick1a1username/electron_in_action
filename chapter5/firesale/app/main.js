const fs = require('fs');

const { app, BrowserWindow, dialog } = require('electron');


const windows = new Set();
let mainWindow = null;

const openFile = exports.openFile = (targetWindow, file) => {
    const content = fs.readFileSync(file).toString();
    targetWindow.webContents.send('file-opened', file, content)
};

const getFileFromUser = exports.getFileFromUser = (targetWindow) => {
    const files = dialog.showOpenDialog(targetWindow, {
        properties: ['openFile'],
        filters: [
            { name: 'Text Files', extensions: ['txt'] },
            { name: 'Markdown Files', extensions: ['md', 'markdown'] }
        ]
    });
  
    if (!files) return;
  
    // 'files' is Promise.
    // console.log(files);

    // files.then( files => console.log(files));

    // const file = files[0];
    // const content = fs.readFileSync(file).toString();

    // console.log(content);

    files.then( files => {
        if (files.filePaths[0]) openFile(targetWindow, files.filePaths[0]);
    })
};

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

    newWindow.on('closed', () => {
        windows.delete(newWindow);
        newWindow = null;
    });

    windows.add(newWindow);
    return newWindow;
}


app.on('ready', () => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform === 'darwin') return false;
    app.quit();
});

app.on('activate', (event, hasVisibleWindows) => {
    if (!hasVisibleWindows) createWindow();
});