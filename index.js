const keys = (arr1, ...arr2) => string => {
  let ret = {}
  const newArr = arr1.map(item => item.trim().replace(/(\s)+|(\n)+/ig, " ").split(' '))
  const reduced  = newArr.reduce((acc, val) => acc.concat(val), []).filter(Boolean)
 
  const final = [...reduced, ...arr2]
  final.forEach(item => {
    ret[item] = string ? `${string}/${item}` : item
  })

  console.log(ret)
  return ret
}

const test1 = 'TEST1'
const test2 = 'TEST2'

keys`
  THIS
  IS_TACO
  SOME
  ${test1}
  ${test2}
  TEXT
`()

keys`SECOND TEST ${test1}`('appName')

module.exports = keys
