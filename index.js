const kenum = new Proxy({}, {
	get: (obj, prop) => ([string]) => string
		.split(/[\n\s]+/)
		.filter(Boolean)
		.reduce((obj, key) => (obj[key] = `${prop}/${key}`, obj), {})
})

module.exports = kenum
