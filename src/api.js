const GitHubApi = require('github')
const Promise = require('bluebird')
const path = require('path')
const fs = Promise.promisifyAll(require('fs'))

const reposFile = path.join(__dirname, '..', './repos.json')

const github = new GitHubApi({
  debug: true,
  protocol: 'https',
  host: 'api.github.com',
  headers: {
    'user-agent': 'Zazu plugin',
  },
  Promise: Promise,
  followRedirects: false,
  timeout: 5000,
})

github.authenticate({
  type: 'netrc',
})

const getAllFromPage = pageNumber => {
  return github.repos.getAll({per_page: 100, page: pageNumber})
    .then(repos => {
      if (github.hasNextPage(repos)) {
        return getAllFromPage(pageNumber + 1)
          .then(moreRepos => repos.concat(moreRepos))
      }
      return repos
    })
}

const getAll = () => {
  return getAllFromPage(1)
    .then(repos => {
      return repos.map(repo => ({
        name: repo.full_name,
        url: repo.html_url,
      }))
    })
}

module.exports.reset = () => {
  return fs.unlinkAsync(reposFile)
    .then(() => getAll())
    .then(repos => {
      const json = JSON.stringify(repos)
      return fs.writeFileAsync(reposFile, json)
        .then(() => repos)
    })
}

module.exports.get = () => {
  if (fs.existsSync(reposFile)) {
    return fs.readFileAsync(reposFile)
      .then(repos => JSON.parse(repos))
  } else {
    return getAll()
      .then(repos => {
        const json = JSON.stringify(repos)
        return fs.writeFileAsync(reposFile, json)
          .then(() => repos)
      })
  }
}
