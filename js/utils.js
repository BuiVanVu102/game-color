import { getPlayAgainButton, getResultGame } from './selectors.js'

export const MixColor = (arr) => {
  if (!Array.isArray(arr)) return arr
  let currentIndex = arr.length
  let temporaryValue, randomIndex
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = arr[currentIndex]
    arr[currentIndex] = arr[randomIndex]
    arr[randomIndex] = temporaryValue
  }
  return arr
}

export const getRandomColorPairs = (count) => {
  const listColor = []
  const hueColor = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'monochrome']
  for (let i = 0; i < hueColor.length; i++) {
    const getColor = window.randomColor({
      luminosity: 'dark',
      hue: hueColor[i % hueColor.length],
    })
    listColor.push(getColor)
  }
  //x2 and mix color
  const test = [...listColor, ...listColor]
  MixColor(test)
  return test
}

//handle show button
const getButtonPlay = getPlayAgainButton()
//get button
export const toggleShowPlayButton = () => {
  getButtonPlay.classList.add('show')
}
//hide button
export const toggleHideButtonPlay = () => {
  getButtonPlay.classList.remove('show')
}
export const setTimerText = (text) => {
  let getTimer = getResultGame()
  return (getTimer.textContent = text)
}

export const createTimer = ({ counter, onChange, onFinish }) => {
  let timerId = null

  const start = () => {
    clear()
    let currentCounter = counter
    timerId = setInterval(() => {
      // if(onChange) onChange(currentCounter)
      onChange?.(currentCounter)
      --currentCounter
      if (currentCounter < 0) {
        clear()
        onFinish?.()
      }
    }, 1000)
  }
  const clear = () => {
    clearInterval(timerId)
  }
  return {
    start,
    clear,
  }
}
