const { validate2Chars, validate3Chars, isCorrectGuessing } = require('./validator')
const { aiRandom } = require('./ai')

// Set up readline to receive text input from terminal
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

// When it is AI's turn to guess
const aiTurn = next => {
  console.log("\x1b[46m===== AI's turn to guess =====\x1b[0m")
  readline.question('Your input: ', text => {
    const lowerText = text.toLowerCase()
    if (!validate2Chars(lowerText)) {
      return aiTurn(humanTurn)
    }
    const aiGuess = aiRandom(true)
    const guessingResult = isCorrectGuessing(aiGuess, lowerText)
    console.log("AI's guess:", aiGuess)
    console.log(
      `AI's guess is: ${guessingResult ? '\x1b[42mCORRECT\x1b[0m' : '\x1b[41mWRONG\x1b[0m'}`
    )
    if (guessingResult) {
      console.log('--------------')
      console.log('|  YOU LOSE  |')
      console.log('--------------')
      readline.close()
      return
    }
    return next(aiTurn)
  })
}

// When it is Human's turn to guess
const humanTurn = next => {
  console.log('\x1b[44m===== Your turn to guess =====\x1b[0m')
  readline.question('Your guess: ', text => {
    const lowerText = text.toLowerCase()
    if (!validate3Chars(lowerText)) {
      return humanTurn(aiTurn)
    }
    const aiInput = aiRandom()
    const guessingResult = isCorrectGuessing(lowerText, aiInput)
    console.log('AI:', aiInput)
    console.log(
      `Your guess is: ${guessingResult ? '\x1b[42mCORRECT\x1b[0m' : '\x1b[41mWRONG\x1b[0m'}`
    )
    if (guessingResult) {
      console.log('--------------')
      console.log('|  YOU  WIN  |')
      console.log('--------------')
      readline.close()
      return
    }
    return next(humanTurn)
  })
}

// start the game
humanTurn(aiTurn)
