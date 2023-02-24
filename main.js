const { app, BrowserWindow } = require('electron');
const path = require('path');
let {Log} = require('./utils/utils')
const nodeManager = require('node-task-mgr')


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

  getForbiddenProcesses(null, []).then(result => {
    console.log(result);
  })

}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  });
});

async function getForbiddenProcesses (_event, forbiddenProcesses) {
  return nodeManager.getProcessList()
  .then(({processes, error}) => {
    if (error) {
      return Promise.reject(error)
    }
    return processes || []
  })
  .then((processes) =>
    processes.filter(([, processName]) => forbiddenProcesses.includes(processName)))
}

async function killProcesses (_event, processes) {
  let unkilled = []

  for (let [pid, processName] of processes) {
    let killResult = await nodeManager.killProcByPID(pid)

    if (killResult.error) {
      log('error', `Error in kill process: ${processName}, stderr: ${killResult.error.trim()}`)
      unkilled.push([pid, processName])
    }
  }

  return unkilled
}
