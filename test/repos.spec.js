const expect = require('chai').expect
const api = require('./support/api')
const repos = require('../src/repos')

const pluginContext = {
  console: { log: (...args) => console.log(...args) },
}

describe('gh', () => {
  it('returns a list of repos', () => {
    return repos(api, pluginContext, '')
      .then(res => {
        expect(res.length).to.eql(2)
      })
  })

  it('returns a filtered list of repos', () => {
    return repos(api, pluginContext, 'manga')
      .then(res => {
        expect(res[0].title).to.eql('gabrielpoca/manga')
        expect(res.length).to.eql(1)
      })
  })
})
