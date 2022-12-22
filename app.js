const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeElement = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#ffcc66', '#ffcc99', '#ffcccc', '#ffccff', '#cc99ff', '#99ccff', '#66cccc', '#33ffff']
let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
  event.preventDefault()
  screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
  if (event.target.classList.contains('time-btn')) time = parseInt(event.target.getAttribute('data-time'))
  screens[1].classList.add('up')
  startGame()
})

board.addEventListener('click', event => {
  if (event.target.classList.contains('circle')) {
    score++
    event.target.remove()
    createRandomCircle()
  }
})

function startGame() {
  const gameInterval = setInterval(decreaseTime, 1000)
  createRandomCircle()
  setTime(time)
}

function decreaseTime() {
  if (time === 0) { 
    finishGame()
    // clearInterval(gameInterval)
  } else {
    let current = --time
    if (current < 10) current = `0${current}`
    setTime(current)
  }

}

function setTime(value) {
  timeElement.innerHTML = `00:${value}`
}

function finishGame() {
  board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`
  //timeElement.parentNode.remove()
  timeElement.parentNode.classList.add('hide')
}

function createRandomCircle() {
  const circle = document.createElement('div')
  circle.classList.add('circle')
  const size = getRandomNumber(10, 60)
  circle.style.height  = `${size}px`
  circle.style.width = circle.style.height
  const {width, height} = board.getBoundingClientRect()

  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)
  
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`
  circle.style.backgroundColor = colors[getRandomNumber(0, colors.length - 1)]
  board.append(circle)
}

function getRandomNumber(min=10, max=60) {
  return Math.round(min + Math.random() * (max  - min))
}