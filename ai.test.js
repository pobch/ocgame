const { aiRandom } = require('./ai')

describe("AI's random function", () => {
  describe('Random 2 characters', () => {
    let results = []
    beforeAll(() => {
      for (let i = 0; i < 200; i++) {
        results.push(aiRandom())
      }
    })
    it('is 2 char long', () => {
      results.forEach(text => expect(text.length).toEqual(2))
    })
    it('includes either "o" or "c" char', () => {
      results.forEach(text => {
        expect(text).toMatch(/^oo|oc|co|cc$/)
      })
    })
    it('is "oo" at least once in 200 times random', () => {
      expect(results.some(text => text === 'oo')).toBeTruthy()
    })
    it('is "oc" at least once in 200 times random', () => {
      expect(results.some(text => text === 'oc')).toBeTruthy()
    })
    it('is "co" at least once in 200 times random', () => {
      expect(results.some(text => text === 'co')).toBeTruthy()
    })
    it('is "cc" at least once in 200 times random', () => {
      expect(results.some(text => text === 'cc')).toBeTruthy()
    })
  })
  describe('Random 3 characters', () => {
    let results = []
    beforeAll(() => {
      for (let i = 0; i < 200; i++) {
        results.push(aiRandom(true))
      }
    })
    it('is 3 char long', () => {
      results.forEach(text => expect(text.length).toEqual(3))
    })
    it('begins with either "o" or "c" char', () => {
      results.forEach(text => {
        expect(text).toMatch(/^oo|oc|co|cc/)
      })
    })
    it('is "ooX" at least once in 200 times random', () => {
      expect(results.some(text => text.slice(0, -1) === 'oo')).toBeTruthy()
    })
    it('is "ocX" at least once in 200 times random', () => {
      expect(results.some(text => text.slice(0, -1) === 'oc')).toBeTruthy()
    })
    it('is "coX" at least once in 200 times random', () => {
      expect(results.some(text => text.slice(0, -1) === 'co')).toBeTruthy()
    })
    it('is "ccX" at least once in 200 times random', () => {
      expect(results.some(text => text.slice(0, -1) === 'cc')).toBeTruthy()
    })
    it('contains "0" or "1" or "2" or "3" or "4" as the 3rd character', () => {
      results.forEach(text => {
        expect(text[2]).toMatch(/0|1|2|3|4/)
      })
    })
  })
})
