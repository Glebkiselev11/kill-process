
window.addEventListener('DOMContentLoaded', () => {
  // const replaceText = (selector, text) => {
  //   const element = document.getElementById(selector)
  //   if (element) element.innerText = text
  // }

  const insertText = text => {
    const element = document.getElementById('display');
    if (element) {
      const oldText = element.textContent;

      element.innerText = oldText + ' ' + text;

    }
  }



  // replaceText()

  // for (const dependency of ['chrome', 'node', 'electron']) {
  //   replaceText(`${dependency}-version`, process.versions[dependency])
  // }
})