const Promise = require('bluebird')
const path = require('path')
const fs = Promise.promisifyAll(require('fs'))

const file = path.join(__dirname, './repos.json')

module.exports.get = () => {
  return fs.readFileAsync(file)
    .then(repos => JSON.parse(repos))
}

module.exports.reset = () => {
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}
