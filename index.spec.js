
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
  it('should work with a inserted variable', () => {
    const VAR = 'VAR'
    const result = kenum.FOO`
      BAR
      ${VAR}
      PIE
      YUM
    `
    expect(result).toEqual({
      BAR: 'FOO/BAR',
      VAR: 'FOO/VAR',
      PIE: 'FOO/PIE',
      YUM: 'FOO/YUM'
    })
  })
  it('should work with inserted variables', () => {
    const VAR = 'VAR'
    const LET = 'LET'
    const result = kenum.FOO`
      BAR
      ${VAR}
      PIE
      ${LET}
      YUM
    `
    expect(result).toEqual({
      BAR: 'FOO/BAR',
      VAR: 'FOO/VAR',
      PIE: 'FOO/PIE',
      LET: 'FOO/LET',
      YUM: 'FOO/YUM'
    })
  })
})
