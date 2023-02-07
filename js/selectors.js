export function getColorElementList() {
  return document.querySelectorAll('#colorList > li')
}

export function getTimerElement() {
  return document.querySelector('.game .game__timer')
}

export function getPlayAgainButton() {
  return document.querySelector('.game .game__button')
}

export function getColorBackground() {
  return document.querySelector('.color-background')
}
export function getBlockColorElement() {
  return document.querySelector('.color-list')
}

export function getAllElementNotActive() {
  return document.querySelectorAll('#colorList > li:not(.active)')
}

export function getResultGame() {
  return document.querySelector('.game__timer')
}

export const getBackgroundColor = () => {
  return document.querySelector('.color-background')
}
