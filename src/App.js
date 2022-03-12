/* eslint-disable no-tabs */
import React, { Component, Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
// import { NavigationContainer } from '@react-navigation/native'

import Dragonfly from './components/Dragonfly'
import Ground from './components/Underground'
import AdversaryPair from './components/AdversaryPair'
import Label from './components/Label'
import GameScore from './components/Score'

import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'

import Home from './components/scores/Home'
import Scores from './components/scores/Scores'
import OneUserAllScores from './components/scores/OneUserAllScores'
import ScoreCreate from './components/scores/ScoreCreate'
import ScoreEdit from './components/scores/ScoreEdit'
import Score from './components/scores/Score'
import AllUsers from './components/auth/IndexUsers'
// import GamePlay from './components/scores/GamePlay'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: [],
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
      if (e.key === ' ') {
        const dragonflyFalling = false
        this.setState({ dragonflyFalling: dragonflyFalling })
      }
    }

    // Function called repeatedly (simulating Gravity)
    dragonflyMoveDown = () => {
      if (this.state.dragonflyFalling === true) {
        const dragonflyPos = this.state.dragonflyPos + this.state.dragonflyFall
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
        this.state.dragonflyPos < this.state.randomLength2 - 20
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
    }

    // Function that updates the Score and also called increaseGameSpeed() after every 5 score
    getScore = () => {
      if (this.state.adversarypos1 === 10 || this.state.adversarypos2 === 10) {
        const score = this.state.score + 1
        this.setState({ score: score })
        this.increaseGameSpeed()
      }
    }

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
    restart = (e) => {
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
      if (e.key === ' ') {
        const dragonflyFalling = false
        this.setState({ dragonflyFalling: dragonflyFalling })
      }
    }

  setUser = (user) => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter((msg) => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return {
        msgAlerts: [...state.msgAlerts, { heading, message, variant, id }]
      }
    })
  }

  render () {
    const { msgAlerts, user } = this.state
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
      <Fragment>
        <Header user={user} />
        <React.Fragment>
          <div id='mainGame' tabIndex='0' onKeyDown={this.btnPressed}>
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
              upperAdversaryLength={this.state.randomLength2}
              pos={this.state.adversarypos2}
            />
            <GameScore score={this.state.score} />
            {renderLabel()}
            <span className='btnHoldingSpan m-2'>
              <button
                className='btn btn-info m-2 myBtn'
                style={{ width: 570, marginLeft: 4 }}
                onClick={this.restart}
              >
              Restart
              </button>
            </span>
          </div>
        </React.Fragment>

        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
          />
        ))}
        <main className='container'>

          <Routes>

            <Route
              exact path='/'
              element={<Home msgAlert={this.msgAlert} setUser={this.setUser} />}
            />

            <Route
              path='/sign-up'
              element={<SignUp msgAlert={this.msgAlert} setUser={this.setUser} /> }
            />

            <Route
              path='/sign-in'
              element={<SignIn msgAlert={this.msgAlert} setUser={this.setUser} /> }
            />

            <Route
              path='/sign-out'
              element={<SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} /> }
            />

            <Route
              path='/change-password'
              element={<ChangePassword msgAlert={this.msgAlert} user={user} /> }
            />

            <Route
              user={user}
              path='/users'
              element={<AllUsers msgAlert={this.msgAlert} user={user} />}
            />

            <Route
              user={user}
              path='/scores/create'
              element={<ScoreCreate msgAlert={this.msgAlert} user={user} />}
            />

            <Route
              user={user}
              path='/scores/owner'
              element={<OneUserAllScores msgAlert={this.msgAlert} user={user} />}
            />

            <Route
              user={user}
              path='/scores/:id'
              element={<Score msgAlert={this.msgAlert} user={user} />}
            />

            <Route
              user={user}
              path='/scores'
              element={<Scores msgAlert={this.msgAlert} user={user} />}
            />

            <Route
              user={user}
              path='/scores/:id/edit'
              element={<ScoreEdit msgAlert={this.msgAlert} user={user} />}
            />

            {/* <Route
            user={user}
            path='/scores/'
            element={<ScoreEdit msgAlert={msgAlert} user={user} />}
          /> */}
          </Routes>
        </main>
      </Fragment>
    )
  }
}

export default App
