

const Log = (win) => (methodName, ...args) => {

  console[methodName](...args)
  if (win && win.webContents) {
    if (win && win.webContents) {
      win.webContents.executeJavaScript(`console.${methodName}("${args.join(', ').replace(/(\r\n|\n|\r|")/gm, '')}")`)
    }
  }
}

module.exports = {Log}
