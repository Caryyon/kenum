
const kenum = require('./index')

describe('kenum', () => {
  it('should return kenum object', () => {
    const result = kenum.FOO`
      BAR
      PIE
      YUM
    `
    expect(result).toEqual({
      BAR: 'FOO/BAR',
      PIE: 'FOO/PIE',
      YUM: 'FOO/YUM'
    })
  })

  it('should work with many returns', () => {
    const result = kenum.FOO`
      BAR

      PIE



      YUM
    `
    expect(result).toEqual({
      BAR: 'FOO/BAR',
      PIE: 'FOO/PIE',
      YUM: 'FOO/YUM'
    })
  })
})
