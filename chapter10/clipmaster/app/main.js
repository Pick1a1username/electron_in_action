const { menubar } = require('menubar');

// https://github.com/maxogden/menubar
const mb = menubar({
    index: `file://${__dirname}/index.html`
});

mb.on('ready', () => {
  console.log('Application is ready.');
});

// mb.on('after-create-window', () => {
//     console.log('Triggered?');
//     console.log(`file://${__dirname}/app/index.html`);
//     mb.window.loadURL(`file://${__dirname}/app/index.html`);
// });