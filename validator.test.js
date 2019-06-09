const {
  validateTextLength,
  validateOC,
  validateNum,
  validate2Chars,
  validate3Chars,
  isCorrectGuessing
} = require('./validator')

describe('Function to validate text length', () => {
  it('supports 2 character validation', () => {
    expect(validateTextLength('6b', 2)).toBeTruthy()
    expect(validateTextLength('x4', 2)).toBeTruthy()
    expect(validateTextLength('02', 2)).toBeTruthy()
    expect(validateTextLength('rr', 2)).toBeTruthy()
    expect(validateTextLength('dfadf', 2)).toBeFalsy()
    expect(validateTextLength('', 2)).toBeFalsy()
    expect(validateTextLength('d', 2)).toBeFalsy()
    expect(validateTextLength('ddx', 2)).toBeFalsy()
  })
  it('supports 3 character validation', () => {
    expect(validateTextLength('6b8', 3)).toBeTruthy()
    expect(validateTextLength('x-5', 3)).toBeTruthy()
    expect(validateTextLength('050', 3)).toBeTruthy()
    expect(validateTextLength('dge', 3)).toBeTruthy()
    expect(validateTextLength('', 3)).toBeFalsy()
    expect(validateTextLength('ds', 3)).toBeFalsy()
    expect(validateTextLength('ddxf', 3)).toBeFalsy()
  })
  it('throw Error when arguments are not string and number >= 0', () => {
    expect(() => validateTextLength(true, 3)).toThrow()
    expect(() => validateTextLength({}, 3)).toThrow()
    expect(() => validateTextLength([], 3)).toThrow()
    expect(() => validateTextLength(333, 3)).toThrow()
    expect(() => validateTextLength('abc', -1)).toThrow()
    expect(() => validateTextLength('abc', 5.66)).toThrow()
    expect(() => validateTextLength()).toThrow()
  })
})

describe('Function to validate that the text begins with "oo", "oc", "co" or "cc"', () => {
  it('valids the text begin with "oo"', () => {
    expect(validateOC('oOxds')).toBeTruthy()
    expect(validateOC('oofdsfa')).toBeTruthy()
    expect(validateOC('OOhhd')).toBeTruthy()
    expect(validateOC('oghd')).toBeFalsy()
  })
  it('valids the text begin with "oc"', () => {
    expect(validateOC('oCxds')).toBeTruthy()
    expect(validateOC('OCfdsfa')).toBeTruthy()
    expect(validateOC('ochhd')).toBeTruthy()
    expect(validateOC('Ochd')).toBeTruthy()
  })
  it('valids the text begin with "co"', () => {
    expect(validateOC('COxds')).toBeTruthy()
    expect(validateOC('cofdsfa')).toBeTruthy()
    expect(validateOC('cOhhd')).toBeTruthy()
    expect(validateOC('Cohd')).toBeTruthy()
  })
  it('valids the text begin with "cc"', () => {
    expect(validateOC('CCxds')).toBeTruthy()
    expect(validateOC('ccfdsfa')).toBeTruthy()
    expect(validateOC('cChhd')).toBeTruthy()
    expect(validateOC('Cchd')).toBeTruthy()
  })
  it('invalidate other cases', () => {
    expect(validateOC('hhtjj')).toBeFalsy()
    expect(validateOC('3344')).toBeFalsy()
    expect(validateOC('o')).toBeFalsy()
    expect(validateOC('c')).toBeFalsy()
  })
  it('throw Error when an argument is not string', () => {
    expect(() => validateOC(true)).toThrow()
    expect(() => validateOC()).toThrow()
    expect(() => validateOC([])).toThrow()
    expect(() => validateOC(222)).toThrow()
  })
})

describe('Function to validate that the character is number in range 0-4', () => {
  it('throw Error when an argument is not a single character string', () => {
    expect(() => validateNum(true)).toThrow()
    expect(() => validateNum(false)).toThrow()
    expect(() => validateNum('-8')).toThrow()
    expect(() => validateNum([])).toThrow()
    expect(() => validateNum({})).toThrow()
    expect(() => validateNum('55')).toThrow()
    expect(() => validateNum('')).toThrow()
  })
  it('must be "0", "1", "2", "3" or "4" character', () => {
    expect(validateNum('0')).toBeTruthy()
    expect(validateNum('1')).toBeTruthy()
    expect(validateNum('2')).toBeTruthy()
    expect(validateNum('3')).toBeTruthy()
    expect(validateNum('4')).toBeTruthy()
    expect(validateNum('5')).toBeFalsy()
    expect(validateNum('6')).toBeFalsy()
    expect(validateNum(' ')).toBeFalsy()
    expect(validateNum('d')).toBeFalsy()
    expect(validateNum('&')).toBeFalsy()
  })
})

describe('Function to validate user input when they are not a predictor', () => {
  it('accepts "oo", "oc", "co" or "cc" (case insensitive)', () => {
    expect(validate2Chars('oC')).toBeTruthy()
    expect(validate2Chars('CC')).toBeTruthy()
    expect(validate2Chars('co')).toBeTruthy()
    expect(validate2Chars('Oo')).toBeTruthy()
  })
  it('denies other cases', () => {
    expect(validate2Chars('oc3')).toBeFalsy()
    expect(validate2Chars('co ')).toBeFalsy()
    expect(validate2Chars('coc')).toBeFalsy()
    expect(validate2Chars('OD')).toBeFalsy()
    expect(validate2Chars('xy2')).toBeFalsy()
    expect(validate2Chars('c')).toBeFalsy()
    expect(validate2Chars('')).toBeFalsy()
    expect(validate2Chars('ochdfkdajlk')).toBeFalsy()
  })
})

describe('Function to validate user input when they are a predictor', () => {
  it('accepts "ooX", "ocX", "coX" or "ccX" (case insensitive, X is number 0-4)', () => {
    expect(validate3Chars('oC1')).toBeTruthy()
    expect(validate3Chars('CC0')).toBeTruthy()
    expect(validate3Chars('co4')).toBeTruthy()
    expect(validate3Chars('Oo2')).toBeTruthy()
  })
  it('denies other cases', () => {
    expect(validate3Chars('oc')).toBeFalsy()
    expect(validate3Chars('o')).toBeFalsy()
    expect(validate3Chars('')).toBeFalsy()
    expect(validate3Chars('CC8')).toBeFalsy()
    expect(validate3Chars('od2')).toBeFalsy()
    expect(validate3Chars('ocococo7')).toBeFalsy()
    expect(validate3Chars('oc-5')).toBeFalsy()
    expect(validate2Chars('co ')).toBeFalsy()
    expect(validate2Chars('coc')).toBeFalsy()
  })
})

describe('Function to determine whether the guessing is correct', () => {
  it('returns true if the total amount of "o" equal to the guessing number', () => {
    expect(isCorrectGuessing('OC3', 'oO')).toBeTruthy()
    expect(isCorrectGuessing('Co2', 'cO')).toBeTruthy()
    expect(isCorrectGuessing('cc1', 'oc')).toBeTruthy()
    expect(isCorrectGuessing('oo4', 'oo')).toBeTruthy()
    expect(isCorrectGuessing('cc0', 'cc')).toBeTruthy()
  })
  it('returns false if the total amount of "o" is not equal to the guessing number', () => {
    expect(isCorrectGuessing('oc0', 'oO')).toBeFalsy()
    expect(isCorrectGuessing('co3', 'cc')).toBeFalsy()
    expect(isCorrectGuessing('cc2', 'oc')).toBeFalsy()
    expect(isCorrectGuessing('oc4', 'cc')).toBeFalsy()
  })
})
