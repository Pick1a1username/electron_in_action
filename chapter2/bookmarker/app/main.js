const {app, BrowserWindow} = require('electron');

let mainWindow = null;

app.on('ready', () => {
    console.log('Hello from Electron');
    mainWindow = new BrowserWindow();
    // mainWindow.webContents.loadFile('index.html'); <- This doesn't work!
    mainWindow.webContents.loadFile('app/index.html');
});