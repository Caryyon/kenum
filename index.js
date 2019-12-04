const kenum = new Proxy({}, {
	get: (obj, prop) => (strings, ...expressions) => strings
		.concat(expressions)
		.flatMap(x => x.split(/\s+/))
		.filter(Boolean)
		.reduce((obj, key) => (obj[key] = `${prop}/${key}`, obj), {})
})

// THESE ARE TESTS CASES
// TODO: REMOVE THESE
const test1 = kenum.TEST`FOO BAR`
const test2 = kenum.TEST2`FOO BAR BAZ`

console.log(test1)
console.log(test2)

module.exports = kenum
