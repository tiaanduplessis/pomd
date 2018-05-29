const path = require('path')

module.exports = {
  clearLineAndWrite: text => {
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    process.stdout.write(text)
  },

  getStorePath: () => path.join(require('os').homedir(), '.pomd.json')
}
