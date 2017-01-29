module.exports = (api, pluginContext, query) => {
  return api.get().then(repos => {
    return repos
      .filter(repo => repo.name.includes(query))
      .map(repo => ({
        icon: 'fa-github',
        title: repo.name,
        value: repo.url,
      }))
  })
}
