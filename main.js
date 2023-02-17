const { app, BrowserWindow } = require('electron');
const path = require('path');
const systeminformation = require('systeminformation')
let {Log} = require('./utils/utils')


const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  const log = Log(win)

  win.webContents.openDevTools();

  systeminformation.graphics().then(({displays}) => {
    log('log', 'counts of monitor', displays.length);
  });


  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  });
});