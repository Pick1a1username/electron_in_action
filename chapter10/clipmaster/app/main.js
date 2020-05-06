const { menubar } = require('menubar');

// https://github.com/maxogden/menubar
const mb = menubar({
    index: `file://${__dirname}/index.html`,
    browserWindow: {
        webPreferences: {
          nodeIntegration: true
        }
    }
});

mb.on('ready', () => {
  console.log('Application is ready.');
});