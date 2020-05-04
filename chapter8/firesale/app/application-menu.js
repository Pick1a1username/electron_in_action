const { app,
        BrowserWindow,
        Menu,
        remote,
        shell } = require('electron');
const main = require('./main');

const createApplicationMenu = (windowCustomProperties) => {

    console.log(windowCustomProperties);
    const hasOneOrMoreWindows = !!BrowserWindow.getAllWindows();
    const focusedWindow = BrowserWindow.getFocusedWindow();

    // Todo: change let to const.
    let hasFilePath = false;

    if (windowCustomProperties) {
        hasFilePath = !!(focusedWindow &&
            (focusedWindow.getRepresentedFilename() || windowCustomProperties.get(focusedWindow).representedFilename));
    }

    const template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'New File',
                    accelerator: 'CommandOrControl+N',
                    click() {
                        main.createWindow();
                    }
                },
                {
                    label: 'Open File',
                    accelerator: 'CommandOrControl+O',
                    click(item, focusedWindow) {
                        if (focusedWindow) {
                            return main.getFileFromUser(focusedWindow);
                        }
                        
                        const newWindow = main.createWindow();

                        newWindow.on('show', () => {
                            main.getFileFromUser(newWindow);
                        });
                    }
                },
                {
                    label: 'Save File',
                    accelerator: 'CommandOrControl+S',
                    enabled: hasOneOrMoreWindows,
                    click(item, focusedWindow) {
                        if (!focusedWindow) {
                            return dialog.showErrorBox(
                                'Cannot Save or Export',
                                'There is currently no active document to save or export.'
                            );
                        }

                        focusedWindow.webContents.send('save-markdown');
                    },
                },
                {
                    label: 'Export HTML',
                    accelerator: 'Shift+CommandOrControl+S',
                    enabled: hasOneOrMoreWindows,
                    click(item, focusedWindow) {
                        if (!focusedWindow) {
                            return dialog.showErrorBox(
                                'Cannot Save or Export',
                                'There is currently no active document to save or export.'
                            );
                        }
                        
                        focusedWindow.webContents.send('save-html');
                    },
                },
                { type: 'separator' },
                {
                    label: 'Show File',
                    accelerator: 'Shift+CommandOrControl+S',
                    enabled: hasFilePath,
                    click(item, focusedWindow) {
                        if (!focusedWindow) {
                            return dialog.showErrorBox(
                                'Cannot Show File\'s Location',
                                'There is currently no active document show.'
                            );
                        }
                        focusedWindow.webContents.send('show-file');
                    },
                },
                {
                    label: 'Open in Default Editor',
                    accelerator: 'Shift+CommandOrControl+S',
                    enabled: hasFilePath,
                    click(item, focusedWindow) {
                        if (!focusedWindow) {
                            return dialog.showErrorBox(
                                'Cannot Show File\'s Location',
                                'There is currently no active document show.'
                            );
                        }
                        focusedWindow.webContents.send('open-in-default');
                    },
                },
            ],
        },
        {
        label: 'Edit',
        submenu: [
            {
            label: 'Undo',
            accelerator: 'CommandOrControl+Z',
            role: 'undo',
            },
            {
            label: 'Redo',
            accelerator: 'Shift+CommandOrControl+Z',
            role: 'redo',
            },
            { type: 'separator' },
            {
            label: 'Cut',
            accelerator: 'CommandOrControl+X',
            role: 'cut',
            },
            {
            label: 'Copy',
            accelerator: 'CommandOrControl+C',
            role: 'copy',
            },
            {
            label: 'Paste',
            accelerator: 'CommandOrControl+V',
            role: 'paste',
            },
            {
            label: 'Select All',
            accelerator: 'CommandOrControl+A',
            role: 'selectall',
            },
        ],
        },
        {
            label: 'Window',
            submenu: [
                {
                    label: 'Minimize',
                    accelerator: 'CommandOrControl+M',
                    role: 'minimize',
                },
                {
                    label: 'Close',
                    accelerator: 'CommandOrControl+W',
                    role: 'close',
                },
            ],
        },
        {
            label: 'Help',
            role: 'help',
            submenu: [
                {
                    label: 'Visit Website',
                    click() { /* To be implemented */ }
                },
                {
                    label: 'Toggle Developer Tools',
                    accelerator: 'Shift+CommandOrControl+I',
                    click(item, focusedWindow) {
                        if (focusedWindow) focusedWindow.webContents.toggleDevTools();
                    }
                }
            ],
        }
    ];


    if (process.platform === 'darwin') {
        const name = app.getName();

        // If the application is running on MacOS, move a new menu item
        // to the beginning of the template array.
        template.unshift({
            label: name,
            submenu: [
                {
                    label: `About ${name}`,
                    role: 'about',
                },
                { type: 'separator' },
                {
                    label: 'Services',
                    role: 'services',
                    submenu: [],
                },
                { type: 'separator' },
                {
                    label: `Hide ${name}`,
                    accelerator: 'Command+H',
                    role: 'hide',
                },
                {
                    label: 'Hide Others',
                    accelerator: 'Command+Alt+H',
                    role: 'hideothers',
                },
                {
                    label: 'Show All',
                    role: 'unhide',
                },
                { type: 'separator' },
                {
                    label: `Quit ${name}`,
                    accelerator: 'Command+Q',
                    click() { app.quit(); },
                },
            ],
        });

        const windowMenu = template.find(item => item.label === 'Window');
        windowMenu.role = 'window';
        windowMenu.submenu.push(
            { type: 'separator' },
            {
                label: 'Bring All to Front',
                role: 'front',
            }
        );
    }

    return Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}
  
  
module.exports = createApplicationMenu;