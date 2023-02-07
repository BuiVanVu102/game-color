import { GAME_STATUS, GAME_TIME, PAIRS_COUNT } from './constants.js'
import {
  getRandomColorPairs,
  toggleShowPlayButton,
  setTimerText,
  toggleHideButtonPlay,
  createTimer,
} from './utils.js'
import {
  getBlockColorElement,
  getColorElementList,
  getAllElementNotActive,
  getPlayAgainButton,
  getBackgroundColor,
} from './selectors.js'
// Global variables
let selections = []
let gameState = GAME_STATUS.PLAYING
let timer = createTimer({
  counter: GAME_TIME,
  onChange: handleOnChange,
  onFinish: handleFinish,
})

function handleOnChange(counter) {
  const fullSecond = `0${counter}`.slice(-2)
  gameState = GAME_STATUS.PLAYING
  console.log('fullSecond', fullSecond)
  setTimerText(fullSecond)
}

function handleFinish() {
  gameState = GAME_STATUS.FINISHED
  setTimerText('GAME OVER :v')
}

// TODOs
// 1. Generating colors using https://github.com/davidmerfield/randomColor
// 2. Attach item click for all li elements
// 3. Check win logic
// 4. Add timer
// 5. Handle replay click

const handleChangeBoxChildrenElement = (element) => {
  const isElement = element.classList.contains('active')
  const isCheckStatus = [GAME_STATUS.FINISHED, GAME_STATUS.BLOCKING].includes(gameState)
  if (!element || isElement || isCheckStatus) return
  //check
  selections.push(element)
  element.classList.add('active')

  if (selections.length < 2) return

  const theFirstSelection = selections[0].dataset.color
  const theSecondSelection = selections[1].dataset.color
  const isMatch = theFirstSelection === theSecondSelection

  if (isMatch) {
    const getElementNotActive = getAllElementNotActive()
    const isWin = getElementNotActive.length === 0
    const backgroundColor = getBackgroundColor()
    backgroundColor.style.background = selections[0].dataset.color
    //win
    if (isWin) {
      //do something
      toggleShowPlayButton()
      setTimerText('YOU WIN :D')
      timer.clear()
      //update status
      gameState = GAME_STATUS.FINISHED
      //gender again new listColor
    }

    selections = []
    return
  }
  //lose
  gameState = GAME_STATUS.BLOCKING
  setTimeout(() => {
    selections[0].classList.remove('active')
    selections[1].classList.remove('active')
    selections = []
    if (gameState != GAME_STATUS.FINISHED) {
      gameState = GAME_STATUS.PLAYING
    }
  }, 500)
}

const initColor = () => {
  const listLiElement = getColorElementList()
  const getListColor = getRandomColorPairs(PAIRS_COUNT)
  listLiElement.forEach((element, index) => {
    element.dataset.color = getListColor[index]
    let overlayElement = element.querySelector('.overlay')
    if (overlayElement) overlayElement.style.background = getListColor[index]
  })
}
const handleClickBox = () => {
  const blockColorElement = getBlockColorElement()
  console.log('blockColorElement', blockColorElement)
  blockColorElement.addEventListener('click', (event) => {
    if (event.target.tagName !== 'LI') return
    const liElement = event.target
    handleChangeBoxChildrenElement(liElement)
  })
}

function resetGame() {
  //reset Global var
  gameState = GAME_STATUS.PLAYING
  selections = []
  /**
   * reset DOM
   * - remove active class from li
   * - hide replay button
   * - clear you win / timeout text
   */
  const getColorELementList = getColorElementList()
  getColorELementList.forEach((element) => {
    element.classList.remove('active')
  })
  toggleHideButtonPlay()
  setTimerText('')

  //re-generate new color
  initColor()

  startTimer()
}

const handlePlayAgainClick = () => {
  const playAgainButton = getPlayAgainButton()
  if (!playAgainButton) return
  playAgainButton.addEventListener('click', resetGame)
}

const startTimer = () => {
  timer.start()
}

;(() => {
  initColor()

  handleClickBox()

  handlePlayAgainClick()

  startTimer()
})()
