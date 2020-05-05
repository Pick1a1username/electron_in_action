const path = require('path');

const {
    app,
    clipboard,
    globalShortcut,
    systemPreferences,
    BrowserWindow,
    Menu,
    Tray,
    } = require('electron');

const clippings = [];
let tray = null;
let browserWindow = null;

const addClipping = () => {
    const clipping = clipboard.readText();
    if (clippings.includes(clipping)) return;
    clippings.unshift(clipping);
    updateMenu();
    return clipping;
};

const getIcon = () => {
    if (process.platform === 'win32') return 'icon-light@2x.ico';
    if (systemPreferences.isDarkMode()) return 'icon-light.png';
    return 'icon-dark.png';
};

const updateMenu = () => {
    const menu = Menu.buildFromTemplate([
        {
            label: 'Create New Clipping',
            click() { addClipping(); },
            accelerator: 'CommandOrControl+Shift+C'
        },
        { type: 'separator' },
        ...clippings.slice(0, 10).map(createClippingMenuItem),
        { type: 'separator' },
        {
            label: 'Quit',
            click() { app.quit(); },
            accelerator: 'CommandOrControl+Q'
        }
    ]);

    tray.setContextMenu(menu);
};

const createClippingMenuItem = (clipping, index) => {
    return {
        label: clipping.length > 20
        ? clipping.slice(0, 20) + '...'
        : clipping,
        click() { clipboard.writeText(clipping); },
        accelerator: `CommandOrControl+${index}`
    };
};


app.on('ready', () => {
    // This is only for MacOS.
    if (app.dock) app.dock.hide();

    browserWindow = new BrowserWindow({
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    });
    browserWindow.loadFile('./app/index.html');
    browserWindow.webContents.toggleDevTools()

    tray = new Tray(path.join(__dirname, getIcon()));

    if (process.platform === 'win32') {
        tray.on('click', tray.popUpContextMenu);
    }

    const activationShortcut = globalShortcut.register(
        'CommandOrControl+Option+C',
        () => { tray.popUpContextMenu(); }
    );

    if (!activationShortcut) {
        console.error('Global activation shortcut failed to register');
    }

    const newClippingShortcut = globalShortcut.register(
        'CommandOrControl+Shift+Option+C',
        () => {
            const clipping = addClipping();
            
            if (clipping) {
                console.log('new clipping added!');
                browserWindow.webContents.send(
                    'show-notification',
                    'Clipping Added',
                    clipping,
                );
            }
        }
    );

    if (!newClippingShortcut) {
        console.error('Global new clipping shortcut failed to register');
    }

    const menu = Menu.buildFromTemplate([
        {
            label: 'Quit',
            click() { app.quit(); }
        }
    ]);

    updateMenu();

    tray.setPressedImage(path.join(__dirname, 'icon-light.png'));
    tray.setToolTip('Clipmaster');
});

