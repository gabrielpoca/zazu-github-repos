const repos = require('./repos')
const api = require('./api')

module.exports = (pluginContext) => {
  return (name, env = {}) => {
    return new Promise((resolve, reject) => {
      resolve(repos(api, pluginContext, name))
    })
  }
}
