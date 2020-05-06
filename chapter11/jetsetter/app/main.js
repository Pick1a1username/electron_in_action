import { app, BrowserWindow } from 'electron';

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 300,
        height: 600,
        minWidth: 300,
        minHeight: 300,
        show: false,
        webPreferences: {
            nodeIntegration: true
        },
    });
    mainWindow.loadFile('./app/index.jade');
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });
});

