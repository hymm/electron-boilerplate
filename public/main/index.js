const { default: electron, app, BrowserWindow } = require('electron');
const electronIsDev = require('electron-is-dev');
const path = require('path');
const url = require('url');

let mainWindow;

const startUrl = electronIsDev
  ? 'http://localhost:3000' // Dev server ran by react-scripts
  : `file://${path.join(__dirname, '../../build/index.html')}`; // Bundled application

function createWindow() {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  // comment this in on first run to get dev tools
  /* const { default: installExtension, { REACT_DEVELOPER_TOOLS }} = require('electron-devtools-installer');
  installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err)); */

  // and load the index.html of the app.
  mainWindow.loadURL(startUrl);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
