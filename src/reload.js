const api = require('./api')

module.exports = (pluginContext) => {
  return (value = '', env = {}) => {
    return new Promise((resolve, reject) => {
      api.reset()
        .then(() => resolve())
    })
  }
}
