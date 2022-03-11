import React, { Component } from 'react'

let maxScore = 0

export default class App extends Component {
  componentDidMount () {
    const dragonfly = document.querySelector('.dragonfly')
    const gameDisplay = document.querySelector('.game-container')
    const underground = document.querySelector('.ground-moving')
    const score = document.querySelector('.score')
    const gameover = document.querySelector('.game-over')
    const restart = document.querySelector('.restart')

    let dragonflyLeft = 220
    let dragonflyBottom = 100
    const gravity = 3
    let isGameOver = false
    const gap = 430
    let currScore = -1

    function startGame () {
      dragonflyBottom -= gravity
      dragonfly.style.bottom = dragonflyBottom + 'px'
      dragonfly.style.left = dragonflyLeft + 'px'
      score.textContent = 'Score:\n' + currScore.toString()
    }
    let gameTimerId = setInterval(startGame, 20)

    function control (e) {
      if (e.keyCode === 32) {
        jump()
      }
    }

    function jump () {
      if (dragonflyBottom < 500) dragonflyBottom += 55
      dragonfly.style.bottom = dragonflyBottom + 'px'
      console.log(dragonflyBottom)
    }
    document.addEventListener('keyup', control)

    function generateAdversary () {
      let adversaryLeft = 500
      const adversaryBottom = Math.random() * 60
      const adversary = document.createElement('div')
      const adversaryTop = document.createElement('div')
      adversary.classList.add('adversary')
      adversaryTop.classList.add('adversaryTop')
      gameDisplay.appendChild(adversary)
      gameDisplay.appendChild(adversaryTop)
      adversary.style.left = adversaryLeft + 'px'
      adversaryTop.style.left = adversaryLeft + 'px'
      adversary.style.bottom = adversaryBottom + 'px'
      adversaryTop.style.bottom = adversaryBottom + gap + 'px'

      function moveAdversary () {
        adversaryLeft -= 2
        adversary.style.left = adversaryLeft + 'px'
        adversaryTop.style.left = adversaryLeft + 'px'

        if (adversaryLeft === -60) {
          clearInterval(timerId)
          adversary.remove()
          adversaryTop.remove()
          // gameDisplay.removeChild(obstacle);
          // gameDisplay.removeChild(topObstacle);
        }
        if ((adversaryLeft > 200 && adversaryLeft < 280 && dragonflyLeft === 220 && (dragonflyBottom < adversaryBottom + 153 ||
          dragonflyBottom > adversaryBottom + gap - 200)) || dragonflyBottom <= 20) {
          clearInterval(timerId)
          clearInterval(gameTimerId)
          gameOver()
        }
      }
      const timerId = setInterval(moveAdversary, 20)
      if (!isGameOver) {
        setTimeout(generateAdversary, 3000)
        currScore++
        score.textContent = 'Score:\n' + currScore.toString()
      }
    }
    generateAdversary()
    function restartGame (e) {
      gameover.textContent = ''
      restart.textContent = ''
      dragonflyLeft = 220
      dragonflyBottom = 100
      isGameOver = false
      currScore = -1
      document.addEventListener('keyup', control)
      gameTimerId = setInterval(startGame, 20)
      generateAdversary()
    }
    function restartHelp (e) {
      if (e.keyCode === 32) {
        document.removeEventListener('keyup', restartHelp)
        setTimeout(restartGame, 3000)
      }
    }
    function gameOver () {
      // clearInterval(gameTimerId);
      console.log('game over')
      isGameOver = true
      if (currScore > maxScore) maxScore = currScore
      score.textContent = ''
      gameover.textContent = 'Game Over! Final Score: ' + currScore + 'High Score: ' + maxScore
      restart.textContent = '(press space to restart)'
      document.removeEventListener('keyup', control)
      underground.classList.add('underground')
      underground.classList.remove('underground-moving')
      const adversaries = document.querySelectorAll('.adversary')
      const tops = document.querySelectorAll('.adversaryTop')
      for (let i = 0; i < adversaries.length; i++) {
        adversaries[i].parentElement.removeChild(adversaries[i])
        tops[i].parentElement.removeChild(tops[i])
      }
      document.addEventListener('keyup', restartHelp)
    }
  }

  render () {
    return (
      <div>
        <div className='border-left'></div>
        <div className='game-container'>
          <div className='border-top'></div>
          <div className='score'>
            <h2 className='score'></h2>
          </div>
          <div className='sky'>
            <h2 className='game-over'></h2>
            <p className='restart'></p>
            <div className='dragonfly'></div>
          </div>
        </div>
        <div className='underground-container'>
          <div className='underground-moving'></div>
        </div>
        <div className='border-right'></div>
      </div>
    )
  }
}
