import kenum from './index';

describe('kenum', () => {
  describe('basic functionality', () => {
    it('should create namespaced enum objects', () => {
      const result = kenum.FOO`
        BAR
        PIE
        YUM
      `;
      expect(result).toEqual({
        BAR: 'FOO/BAR',
        PIE: 'FOO/PIE',
        YUM: 'FOO/YUM',
      });
    });

    it('should handle multiple newlines and whitespace', () => {
      const result = kenum.FOO`
        BAR

        PIE



        YUM
      `;
      expect(result).toEqual({
        BAR: 'FOO/BAR',
        PIE: 'FOO/PIE',
        YUM: 'FOO/YUM',
      });
    });

    it('should return empty object for empty template', () => {
      const result = kenum.FOO``;
      expect(result).toEqual({});
    });

    it('should return empty object for whitespace-only template', () => {
      const result = kenum.FOO`
        
        
      `;
      expect(result).toEqual({});
    });
  });

  describe('template literal interpolation', () => {
    it('should work with a single interpolated variable', () => {
      const VAR = 'VAR';
      const result = kenum.FOO`
        BAR
        ${VAR}
        PIE
        YUM
      `;
      expect(result).toEqual({
        BAR: 'FOO/BAR',
        VAR: 'FOO/VAR',
        PIE: 'FOO/PIE',
        YUM: 'FOO/YUM',
      });
    });

    it('should work with multiple interpolated variables', () => {
      const VAR = 'VAR';
      const LET = 'LET';
      const result = kenum.FOO`
        BAR
        ${VAR}
        PIE
        ${LET}
        YUM
      `;
      expect(result).toEqual({
        BAR: 'FOO/BAR',
        VAR: 'FOO/VAR',
        PIE: 'FOO/PIE',
        LET: 'FOO/LET',
        YUM: 'FOO/YUM',
      });
    });

    it('should handle variables concatenated with strings', () => {
      const sport = 'SPORTS';
      const result = kenum.FOO`${sport}BALLS
        FOOTBALL
        BALL${sport}
      `;
      expect(result).toEqual({
        SPORTSBALLS: 'FOO/SPORTSBALLS',
        FOOTBALL: 'FOO/FOOTBALL',
        BALLSPORTS: 'FOO/BALLSPORTS',
      });
    });

    it('should preserve key order', () => {
      const sport = 'SPORTS';
      const ball = 'BALL';
      const result = kenum.FOO`${sport}BALLS
        FOOT${ball}
        ${ball}${sport}
        TACO
        ${sport}
      `;
      
      const keys = Object.keys(result);
      expect(keys).toEqual([
        'SPORTSBALLS',
        'FOOTBALL',
        'BALLSPORTS',
        'TACO',
        'SPORTS'
      ]);
      
      expect(result).toEqual({
        SPORTSBALLS: 'FOO/SPORTSBALLS',
        FOOTBALL: 'FOO/FOOTBALL',
        BALLSPORTS: 'FOO/BALLSPORTS',
        TACO: 'FOO/TACO',
        SPORTS: 'FOO/SPORTS',
      });
    });

    it('should handle numeric interpolation', () => {
      const version = 2;
      const result = kenum.API`
        VERSION_${version}
        ENDPOINT
      `;
      expect(result).toEqual({
        VERSION_2: 'API/VERSION_2',
        ENDPOINT: 'API/ENDPOINT',
      });
    });
  });

  describe('value assignment', () => {
    it('should assign custom values with = syntax', () => {
      const result = kenum.FOO`
        BAR = customValue
        PIE
        YUM = anotherValue
      `;
      expect(result).toEqual({
        BAR: 'FOO/BAR:customValue',
        PIE: 'FOO/PIE',
        YUM: 'FOO/YUM:anotherValue',
      });
    });

    it('should handle assignments with interpolated variables', () => {
      const VAR = 'VAR';
      const customValue = 'custom';
      const result = kenum.FOO`
        BAR = ${customValue}
        ${VAR}
        PIE = fixed
      `;
      expect(result).toEqual({
        BAR: 'FOO/BAR:custom',
        VAR: 'FOO/VAR',
        PIE: 'FOO/PIE:fixed',
      });
    });

    it('should handle assignments with spaces around equals', () => {
      const result = kenum.FOO`
        BAR=noSpaces
        PIE = withSpaces
        YUM= leftSpace
        ZIP =rightSpace
      `;
      expect(result).toEqual({
        BAR: 'FOO/BAR:noSpaces',
        PIE: 'FOO/PIE:withSpaces',
        YUM: 'FOO/YUM:leftSpace',
        ZIP: 'FOO/ZIP:rightSpace',
      });
    });

    it('should handle numeric assignments', () => {
      const result = kenum.STATUS`
        SUCCESS = 200
        NOT_FOUND = 404
        ERROR = 500
      `;
      expect(result).toEqual({
        SUCCESS: 'STATUS/SUCCESS:200',
        NOT_FOUND: 'STATUS/NOT_FOUND:404',
        ERROR: 'STATUS/ERROR:500',
      });
    });
  });

  describe('different namespaces', () => {
    it('should work with different namespace names', () => {
      const actions = kenum.ACTIONS`
        FETCH
        UPDATE
        DELETE
      `;
      
      const types = kenum.USER_TYPES`
        ADMIN
        GUEST
      `;
      
      expect(actions).toEqual({
        FETCH: 'ACTIONS/FETCH',
        UPDATE: 'ACTIONS/UPDATE',
        DELETE: 'ACTIONS/DELETE',
      });
      
      expect(types).toEqual({
        ADMIN: 'USER_TYPES/ADMIN',
        GUEST: 'USER_TYPES/GUEST',
      });
    });

    it('should handle camelCase and kebab-case namespaces', () => {
      const camelCase = kenum.myActions`TEST`;
      const kebabCase = kenum['my-actions']`TEST`;
      
      expect(camelCase).toEqual({ TEST: 'myActions/TEST' });
      expect(kebabCase).toEqual({ TEST: 'my-actions/TEST' });
    });
  });

  describe('error handling', () => {
    it('should handle function call gracefully', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      
      // @ts-expect-error - testing invalid usage
      const result = kenum.FOO();
      
      expect(result).toEqual({});
      expect(consoleSpy).toHaveBeenCalledWith(
        'kenum should be used with template literals, not as a function call'
      );
      
      consoleSpy.mockRestore();
    });

    it('should handle empty strings in interpolation', () => {
      const empty = '';
      const result = kenum.FOO`
        ${empty}
        BAR
      `;
      expect(result).toEqual({
        BAR: 'FOO/BAR',
      });
    });

    it('should handle undefined interpolation', () => {
      const undef = undefined;
      const result = kenum.FOO`
        ${undef}
        BAR
      `;
      expect(result).toEqual({
        undefined: 'FOO/undefined',
        BAR: 'FOO/BAR',
      });
    });

    it('should handle null interpolation', () => {
      const nullVal = null;
      const result = kenum.FOO`
        ${nullVal}
        BAR
      `;
      expect(result).toEqual({
        null: 'FOO/null',
        BAR: 'FOO/BAR',
      });
    });
  });

  describe('edge cases', () => {
    it('should handle duplicate keys (last one wins)', () => {
      const result = kenum.FOO`
        BAR
        BAR = custom
        BAR
      `;
      expect(result).toEqual({
        BAR: 'FOO/BAR', // last occurrence without assignment
      });
    });

    it('should handle keys with special characters', () => {
      const result = kenum.FOO`
        KEY_WITH_UNDERSCORES
        KEY-WITH-DASHES
        KEY123WITH456NUMBERS
      `;
      expect(result).toEqual({
        KEY_WITH_UNDERSCORES: 'FOO/KEY_WITH_UNDERSCORES',
        'KEY-WITH-DASHES': 'FOO/KEY-WITH-DASHES',
        KEY123WITH456NUMBERS: 'FOO/KEY123WITH456NUMBERS',
      });
    });

    it('should handle single character keys', () => {
      const result = kenum.FOO`
        A
        B
        C
      `;
      expect(result).toEqual({
        A: 'FOO/A',
        B: 'FOO/B',
        C: 'FOO/C',
      });
    });

    it('should handle assignments with complex values', () => {
      const result = kenum.CONFIG`
        API_URL = https://api.example.com/v1
        TIMEOUT = 5000ms
        DEBUG = true
      `;
      expect(result).toEqual({
        API_URL: 'CONFIG/API_URL:https://api.example.com/v1',
        TIMEOUT: 'CONFIG/TIMEOUT:5000ms',
        DEBUG: 'CONFIG/DEBUG:true',
      });
    });
  });
});