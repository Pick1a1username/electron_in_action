const fs = require('fs');

const { app, BrowserWindow, dialog } = require('electron');

let mainWindow = null;

const openFile = (file) => {
    const content = fs.readFileSync(file).toString();
    mainWindow.webContents.send('file-opened', file, content)
};

const getFileFromUser = exports.getFileFromUser = () => {
    const files = dialog.showOpenDialog(mainWindow, {
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
        if (files.filePaths[0]) openFile(files.filePaths[0]);
    })
};
  


app.on('ready', () => {
    mainWindow = new BrowserWindow({ 
        show: false,
        webPreferences: {
            nodeIntegration: true
            }
        });

    mainWindow.loadFile('./app/index.html');

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        getFileFromUser();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});