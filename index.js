const keys = (arr1, ...arr2) => {
  let ret = {}
  const newArr = arr1.map(item => item.trim().replace(/[^A-Z0-9]+/ig, " ").split(' '))
  const reduced  = newArr.reduce((acc, val) => acc.concat(val), [])
 
  const final = [...reduced, ...arr2]
  final.forEach(item => {
    ret[item] = item
  })
 
  console.log(ret)
  return ret
}

const test1 = 'TEST1'
const test2 = 'TEST2'

keys`
  THIS
  IS
  SOME
  ${test1}
  ${test2}
  TEXT
`

keys`SECOND TEST ${test1}`

module.exports = keys
