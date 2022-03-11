import React, { Component } from 'react'
import Dragonfly from '../Dragonfly'
import Ground from '../Underground'
import AdversaryPair from '../AdversaryPair'
import Label from '../Label'
import Score from '../Score'

class GamePlay extends Component {
  state = {
    gameTimer: null,
    speed: 1,
    adversarypos1: 250,
    randomLength1: Math.floor(Math.random() * (450 - 50 + 1) + 50),
    adversarypos2: 548,
    randomLength2: Math.floor(Math.random() * (450 - 50 + 1) + 50),
    dragonflyPos: 320,
    dragonflyFall: 3,
    dragonflyJump: 80,
    dragonflyTimer: null,
    dragonflyFalling: true,
    cnt: 0,
    dragonflyRotate: 0,
    score: 0,
    speedIncreaser: 1,
    LabelVisible: true,
    LabelText1: 'Press Enter to Start',
    LabelText2: 'Space to Jump',
    enterAllowed: true
  }

  // Function called when pressed a keyboard input is given
  btnPressed = (e) => {
    // Enter to start the game
    if (e.key === 'Enter') {
      if (this.state.enterAllowed) {
        const gameTimer = setInterval(this.useEffect, 16.66)
        const dragonflyTimer = setInterval(this.dragonflyMoveDown, 16.66)
        const LabelVisible = false
        const enterAllowed = false
        this.setState({
          gameTimer: gameTimer,
          dragonflyTimer: dragonflyTimer,
          LabelVisible: LabelVisible,
          enterAllowed: enterAllowed
        })
        // Pressing Enter more than once reloads the game
      } else {
        window.location.reload()
      }
    }

    // Function which ultimately calls dragonflyMoveUp()
    if (e.key === '') {
      const dragonflyFalling = false
      this.setState({ dragonflyFalling: dragonflyFalling })
    }
  }

  // Function called repeatedly (simulating Gravity)
  dragonflyMoveDown = () => {
    if (this.state.dragonflyFalling === true) {
      const dragonflyPos = this.state.birdPos + this.state.birdFall
      const dragonflyRotate = 20
      this.setState({ dragonflyPos: dragonflyPos, dragonflyRotate: dragonflyRotate })
    } else {
      clearInterval(this.state.dragonflyTimer)
      const dragonflyTimer = setInterval(this.dragonflyMoveUp, 16.66)
      this.setState({ dragonflyTimer: dragonflyTimer })
    }
  }

  // Function to make Dragonfly Jump
  dragonflyMoveUp = () => {
    const dragonflyPos = this.state.dragonflyPos - 8
    let cnt = this.state.cnt + 1
    const dragonflyRotate = -20
    this.setState({ dragonflyPos: dragonflyPos, cnt: cnt, dragonflyRotate: dragonflyRotate })
    if (cnt === 8) {
      clearInterval(this.state.dragonflyTimer)
      const dragonflyTimer = setInterval(this.dragonflyMoveDown, 16.66)
      const dragonflyFalling = true
      cnt = 0
      this.setState({
        dragonflyTimer: dragonflyTimer,
        dragonflyFalling: dragonflyFalling,
        cnt: cnt
      })
    }
  }

  stopGame = () => {
    clearInterval(this.state.gameTimer)
    clearInterval(this.state.dragonflyTimer)
    const LabelText1 = 'Game Over'
    const LabelText2 = ' '
    const LabelVisible = true
    this.setState({
      LabelText1: LabelText1,
      LabelText2: LabelText2,
      LabelVisible: LabelVisible
    })
  }

  // Collision detection, if condition met calls the stopGame()
  collide = () => {
    // Dying Part
    if (this.state.dragonflyPos > 600) {
      this.stopGame()
    }

    // Game Over by 1st Upper Pipe
    if (
      this.state.adversarypos1 - 50 < 54 &&
      this.state.adversarypos1 + 52 > 58 &&
      this.state.dragonflyPos < this.state.randomLength1 - 20
    ) {
      this.stopGame()
    }

    // Game Over by 1st Lower Pipe
    if (
      this.state.adversarypos1 - 50 < 54 &&
      this.state.adversarypos1 + 52 > 70 &&
      this.state.dragonflyPos >
        2 * this.state.randomLength1 + 116 - this.state.randomLength1 - 47
    ) {
      this.stopGame()
    }

    // Game over by 2nd Upper Pipe
    if (
      this.state.adversarypos2 - 50 < 54 &&
      this.state.adversarypos2 + 52 > 58 &&
      this.state.birdPos < this.state.randomLength2 - 20
    ) {
      this.stopGame()
    }

    // Game over by 2nd Lower Pipe
    if (
      this.state.adversarypos2 - 50 < 54 &&
      this.state.adversarypos2 + 52 > 70 &&
      this.state.dragonflyPos >
        2 * this.state.randomLength2 + 116 - this.state.randomLength2 - 47
    ) {
      this.stopGame()
    }
  };

  // Function that updates the Score and also called increaseGameSpeed() after every 5 score
  getScore = () => {
    if (this.state.adversarypos1 === 10 || this.state.adversarypos2 === 10) {
      const score = this.state.score + 1
      this.setState({ score: score })
      this.increaseGameSpeed()
    }
  };

  // Function to increase the Pipes left velocity, agter every 5 score
  increaseGameSpeed = () => {
    const score = this.state.score
    if (score % 5 === 0 && score !== 0) {
      const speed = this.state.speed + this.state.speedIncreaser
      this.setState({ speed: speed })
    }
  }

  // This get called in every 16.66 milliSeconds which is(60 FPS)
  useEffect = () => {
    let adversarypos1 = this.state.adversarypos1 - this.state.speed
    let adversarypos2 = this.state.adversarypos2 - this.state.speed
    this.setState({ adversarypos1: adversarypos1, adversarypos2: adversarypos2 })

    if (adversarypos1 < -52) {
      adversarypos1 = 548
      const randomLength1 = Math.floor(Math.random() * (450 - 50 + 1) + 50)
      this.setState({ adversarypos1: adversarypos1, randomLength1: randomLength1 })
    }

    if (adversarypos2 < -52) {
      adversarypos2 = 548
      const randomLength2 = Math.floor(Math.random() * (450 - 50 + 1) + 50)
      this.setState({ adversarypos2: adversarypos2, randomLength2: randomLength2 })
    }

    this.collide()

    this.getScore()
  }

  // Restart Function just reloads the webpage
  restart = () => {
    window.location.reload()
  }

  render () {
    const LabelVisible = this.state.LabelVisible
    const renderLabel = () => {
      if (LabelVisible) {
        return (
          <Label
            LabelText1={this.state.LabelText1}
            LabelText2={this.state.LabelText2}
          />
        )
      }
    }
    return (
      <React.Fragment>
        <div id="mainGame" tabIndex="0" onKeyDown={this.btnPressed}>
          <Dragonfly
            dragonflyPos={this.state.dragonflyPos}
            dragonflyRotate={this.state.dragonflyRotate}
          />
          <Ground />
          <AdversaryPair
            upperAdversaryLength={this.state.randomLength1}
            pos={this.state.adversarypos1}
          />
          <AdversaryPair
            upperPipeLength={this.state.randomLength2}
            pos={this.state.adversarypos2}
          />
          <Score score={this.state.score} />
          {renderLabel()}
          <span className="btnHoldingSpan m-2">
            <button
              className="btn btn-info m-2 myBtn"
              style={{ width: 570, marginLeft: 4 }}
              onClick={this.restart}
            >
              Restart
            </button>
          </span>
        </div>
      </React.Fragment>
    )
  }
}

export default GamePlay
