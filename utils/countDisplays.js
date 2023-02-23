const systeminformation = require('systeminformation')
const {powerShell} = require('systeminformation/lib/util')

async function countDisplays (log) {
  if (process.platform === 'win32') {
    try {
      let displays = await powerShell('Get-CimInstance -Namespace root\\wmi -ClassName WmiMonitorBasicDisplayParams | fl Active')
      return displays.replace(/\r\n/g, '').split('Active : ').filter((active) => active === 'True').length
    } catch (error) {
      log('error', `error with powershell: ${error}`)
    }
  }

  let {displays} = await systeminformation.graphics()
  return displays.length
}

module.exports = {countDisplays}
