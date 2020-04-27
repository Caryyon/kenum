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
      YUM: 'FOO/YUM',
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
      YUM: 'FOO/YUM',
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
      PIE: 'FOO/PIE',
      YUM: 'FOO/YUM',
      VAR: 'FOO/VAR',
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
      PIE: 'FOO/PIE',
      YUM: 'FOO/YUM',
      VAR: 'FOO/VAR',
      LET: 'FOO/LET',
    })
  })
  it('should work with inserted variables on the same line as strings example:(FOO${BAR})', () => {
    const sport = 'SPORTS'
    const result = kenum.FOO`${sport}BALLS
      FOOTBALL
      BALL${sport}
    `
    expect(result).toEqual({
      SPORTSBALLS: 'FOO/SPORTSBALLS',
      FOOTBALL: 'FOO/FOOTBALL',
      BALLSPORTS: 'FOO/BALLSPORTS',
    })
  })
})
