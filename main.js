const { app, BrowserWindow } = require('electron');
const path = require('path');
const systeminformation = require('systeminformation')
let {Log} = require('./utils/utils')
let {countDisplays} = require('./utils/countDisplays')

let log;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  log = Log(win)

  win.webContents.openDevTools();


  setInterval(() => {
    isOneDisplay()
  }, 2000);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  });
});

const isOneDisplay = async () => {
  let count = await countDisplays(log)
  log('log', `Number of displays: ${count}`)

  if (count === 0) {
    log('warning', 'No displays detected')
  }

  return count === 1
}