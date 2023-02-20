const { app, BrowserWindow } = require('electron');
const path = require('path');
const systeminformation = require('systeminformation')
let {Log} = require('./utils/utils')

const winapi = require('win32-api');

const SM_CMONITORS = 80;
const SM_CXVIRTUALSCREEN = 78;




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

  // systeminformation.graphics().then(({displays}) => {
  //   log('log', 'counts of monitor', displays.length);
  // });

  // systeminformation.utils.powerShell();


  // win.loadFile('index.html');

  winapi.getSystemMetrics(SM_CMONITORS, (err, numMonitors) => {
    if (err) {
      console.error(err);
      return;
    }
  
    winapi.getSystemMetrics(SM_CXVIRTUALSCREEN, (err, screenWidth) => {
      if (err) {
        console.error(err);
        return;
      }
  
      const displayMode = numMonitors > 1 ? 'Extend' : (screenWidth > 0 ? 'Duplicate' : 'Second screen only');
      console.log(`Display mode: ${displayMode}`);
    });
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  });
});