// Validate that text length
const validateTextLength = (text, len) => {
  if (typeof text !== 'string' || !Number.isInteger(len) || len < 0) {
    throw new Error('Unexpected argument')
  }
  if (text.length !== len) {
    console.log(`The input must be ${len} character long. Try again...`)
    return false
  }
  return true
}

// Validate the first 2 character
const validateOC = input => {
  if (typeof input !== 'string') {
    throw new Error('Unexpected argument')
  }
  const text = String(input).toLowerCase()
  const validChars = ['o', 'c']
  if (!validChars.includes(text[0]) || !validChars.includes(text[1])) {
    console.log('The first 2 characters must be either "o" or "c". Try again...')
    return false
  }
  return true
}

// Validate that the string must be a single-digit number
// and the number must be 0 1 2 3 or 4
const validateNum = char => {
  if (typeof char !== 'string' || char.length !== 1) {
    throw new Error('Unexpected argument')
  }
  if (!/^\d$/.test(char) || +char > 4) {
    console.log('The 3rd character must be a number in range 0 to 4. Try again...')
    return false
  }
  return true
}

// Validate an user's input when they are a predictor
const validate3Chars = input => {
  if (typeof input !== 'string') {
    throw new Error('Unexpected argument')
  }
  const text = input.toLowerCase()
  if (!validateTextLength(text, 3) || !validateOC(text) || !validateNum(text[2])) {
    return false
  }
  return true
}

// Validate an user's input when they are not a predictor
const validate2Chars = input => {
  if (typeof input !== 'string') {
    throw new Error('Unexpected argument')
  }
  const text = input.toLowerCase()
  if (!validateTextLength(text, 2) || !validateOC(text)) {
    return false
  }
  return true
}

// Function to determine if the predictor is win the game by correctly guess the number of 'o'
const isCorrectGuessing = (guessInput, anotherPlayerInput) => {
  if (typeof guessInput !== 'string' || typeof anotherPlayerInput !== 'string') {
    throw new Error('Unexpected argument')
  }
  const guessText = guessInput.toLowerCase()
  const anotherPlayerText = anotherPlayerInput.toLowerCase()
  let countOpen = 0
  const combinedText = guessText.slice(0, -1) + anotherPlayerText
  Array.from(combinedText).forEach(char => {
    if (char === 'o') {
      countOpen++
    }
  })
  if (countOpen === Number(guessText[2])) {
    return true
  }
  return false
}

export {
  validateTextLength,
  validateOC,
  validateNum,
  validate2Chars,
  validate3Chars,
  isCorrectGuessing
}
