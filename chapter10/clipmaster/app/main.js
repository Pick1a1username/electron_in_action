const { globalShortcut, Menu } = require('electron');
const { menubar } = require('menubar');

// https://github.com/maxogden/menubar
const mb = menubar({
    index: `file://${__dirname}/index.html`,
    browserWindow: {
        webPreferences: {
          nodeIntegration: true
        }
    },
    preloadWindow: true // https://github.com/maxogden/menubar/issues/65#issuecomment-141020275
});

const secondaryMenu = Menu.buildFromTemplate([
    {
        label: 'Quit',
        click() { mb.app.quit(); },
        accelerator: 'CommandOrControl+Q'
    },
]);

mb.on('ready', () => {
    console.log('Application is ready.');

    mb.tray.on('right-click', () => {
        mb.tray.popUpContextMenu(secondaryMenu);
    });

    const createClipping = globalShortcut.register('CommandOrControl+!', () => {
        mb.window.webContents.send('create-new-clipping');
    });
    const writeClipping = globalShortcut.register('CmdOrCtrl+Alt+@', () => {
        mb.window.webContents.send('write-to-clipboard');
    });
    const publishClipping = globalShortcut.register('CmdOrCtrl+Alt+#', () => {
        mb.window.webContents.send('publish-clipping');
    });

    if (!createClipping) console.error('Registration failed', 'createClipping');
    if (!writeClipping) console.error('Registration failed', 'writeClipping');
    if (!publishClipping) console.error('Registration failed', 'publishClipping');
});