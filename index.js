import { validate2Chars, validate3Chars, isCorrectGuessing } from './validator.js'
import { aiRandom } from './ai.js'

// Set up readline to receive text input from terminal
import rl from 'readline'
const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout
})

// When it is AI's turn to guess
const aiTurn = () => {
  console.log("\x1b[46m===== AI's turn to guess =====\x1b[0m")
  readline.question('Your input: ', text => {
    const lowerText = text.toLowerCase()
    if (!validate2Chars(lowerText)) {
      return aiTurn()
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
    return humanTurn()
  })
}

// When it is Human's turn to guess
const humanTurn = () => {
  console.log('\x1b[44m===== Your turn to guess =====\x1b[0m')
  readline.question('Your guess: ', text => {
    const lowerText = text.toLowerCase()
    if (!validate3Chars(lowerText)) {
      return humanTurn()
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
    return aiTurn()
  })
}

// start the game
humanTurn()
