const _ = require('lodash')

const kenum = new Proxy({}, {
  get: (x, prop) => (string, ...exp) => {
    const merged = [...string, ...exp]
    let cleaned = merged.map(str => str.split(/[\n\s]+/).filter(Boolean))
    const lean = _.flatten(cleaned)
    return lean.reduce((obj, key) => (obj[key] = `${prop}/${key}`, obj), {})


  }
})

module.exports = kenum
