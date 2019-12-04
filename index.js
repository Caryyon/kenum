const kenum = new Proxy({}, {
  get: (obj, prop) => (strings, ...expressions) => strings
		.concat(expressions)
		.flatMap(x => x.split(/\s+/))
		.filter(Boolean)
		.reduce((obj, key) => (obj[key] = `${prop}/${key}`, obj), {})
})

module.exports = kenum
