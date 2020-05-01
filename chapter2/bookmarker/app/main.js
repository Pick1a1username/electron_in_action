const {app, BrowserWindow} = require('electron');

let mainWindow = null;

app.on('ready', () => {
    console.log('Hello from Electron');
    // https://github.com/electron-in-action/bookmarker/issues/1
    // https://qiita.com/umamichi/items/8781e426e9cd4a88961b
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });
    // mainWindow.webContents.loadFile('index.html'); <- This doesn't work!
    mainWindow.webContents.loadFile('app/index.html');
});