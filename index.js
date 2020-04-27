const flatten = require('lodash.flatten')

const kenum = new Proxy(
  {},
  {
    get: (x, prop) => (strings, ...exp) => {
      // Safe stuff below here
      const parsed = strings
        .reduce((acc, val, idx) => acc.concat(val + (exp[idx] ? exp[idx] : '')), [])
        .join('')
        .split(/[\n\s]+/)
        .filter(Boolean)

      const lean = flatten(parsed)
      return lean.reduce((obj, key) => ((obj[key] = `${prop}/${key}`), obj), {})
    },
  }
)

module.exports = kenum
