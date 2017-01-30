module.exports = (api, pluginContext, query) => {
  return api.get().then(repos => {
    return repos
      .filter(repo => repo.name.indexOf(query) !== -1)
      .map(repo => ({
        icon: 'fa-github',
        title: repo.name,
        value: repo.url,
      }))
  })
}
