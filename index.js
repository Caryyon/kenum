const kenum = new Proxy({}, {
  get: (_, prop) => ([string, ...exp]) => {
    let cleaned
    let staged

    exp.forEach(arr => cleaned = arr.split(/[\n\s]+/).filter(Boolean).reduce((obj, key) => (obj[key] = `${prop}/${key}`, obj), {}))

    staged = string
      .split(/[\n\s]+/)
      .filter(Boolean)
      .reduce((obj, key) => (obj[key] = `${prop}/${key}`, obj), {})


    console.log("CLEANED: ", cleaned)
    console.log("STAGED: ", staged)

    const val = Object.assign({}, cleaned, staged)

    console.log('VAL: ', val)

    return val
  }
})

module.exports = kenum
