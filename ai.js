// Function for AI to random either 'o' or 'c'.
// The 3rd character is a random number which is optional.
export function aiRandom(isAiGuessing = false) {
  let result = ''
  // first 2 char
  for (let i = 0; i < 2; i++) {
    const rand = Math.random()
    if (rand >= 0.5) {
      result = result + 'c'
    } else {
      result = result + 'o'
    }
  }
  // 3rd char
  // to better guess, count its own 'o' first
  const numOpen = Array.from(result).reduce((acc, current) => {
    return acc + Number(current === 'o')
  }, 0)
  // then guess the number more than amount of its own 'o' but not more than 4
  if (isAiGuessing) {
    result = result + String(Math.floor(Math.random() * (5 - numOpen) + numOpen))
  }
  return result
}
