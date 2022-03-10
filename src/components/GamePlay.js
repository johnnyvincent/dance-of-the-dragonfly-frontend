import React, { useEffect, useState } from 'react'
import { useTick } from '@inlet/react-pixi'
import Adversaries from './Adversaries'
import Dragonfly from './Dragonfly'
import Underground from './Underground'
import pondBackground from '../assets/pond-background.png'
import * as Constants from './constants'
import { GameStatus, circleRect, randomAdversary } from './utils'


const GamePlay = () => {
  const [gameStatus, setGameStatus] = useState(GameStatus.Waiting)
  const [score, setScore] = useState(0)
  const [dragonflyY, setDragonflyY] = useState(Constants.Canvas_Height / 2)
  const [velocity, setVelocity] = useState(0)
  const [adversaries, setAdversaries] = useState([randomAdversary(Constants.Canvas_Width)])

  const resetGame = () => {
    setGameStatus(GameStatus.Waiting)
    setScore(0)
    setDragonflyY(Constants.Canvas_Height / 2)
    setVelocity(0)
    setAdversaries([randomAdversary(Constants.Canvas_Width)])
  }
}

const applyDragonflyPhysics = (deltaTime) => {
  if (velocity === 0) return

  setDragonflyY((prevDragonflyY) => prevDragonflyY + (velocity * deltaTime) / 2)
  setVelocity((prevVelocity) => prevVelocity + Constants.Gravity * deltaTime)
  setDragonflyY((prevDragonflyY) => prevDragonflyY + (velocity + deltaTime) / 2)

  const groundLevel = Constants.Canvas_Height - Constants.Ground_Height - Constants.Dragonfly_Radius

  if (dragonflyY > groundLevel) {
    setVelocity(0)
    setDragonflyY(groundLevel)
  }
}

const moveAdversariesLeft = (deltaTime) => {
  setAdversaries((prevAdversaries) =>
    prevAdversaries.map((adversary) => {
      const x = adversary.x - Constants.Adversary_Speed * deltaTime
      return { ...adversary, x }
    }))
}

const spawnNewAdversaries = () => {
  setAdversaries((prevAdversaries) => {
    let newAdversaries = [...prevAdversaries]
    for (let adversary of newAdversaries) {
      if (!adversary.scored && adversary.x < Constants.Dragonfly_X) {
        setScore((prevScore) => prevScore + 1)
        newAdversaries.push(randomAdversary())
        adversary.scored = true
      }
    }
    return newAdversaries
  })
}

const deleteOffscreenAdversaries = () => {
  if (adversaries[0].x <= -Constants.Adversary_Width) {
    setAdversaries((prevAdversaries) => prevAdversaries.slice(1))
  }
}

const groundCollision = () => {
  const bottomDragonfly = DragonflyY + Constants.Dragonfly_Radius
  const topGround = Constants.Canvas_Height - Constants.Ground_Height
  return bottomDragonfly > topGround
}

const adversaryCollision = () => {
  for (let adversary of adversaries) {
    if (
      circleRect(
        Constants.Dragonfly_X,
        dragonflyY,
        Constants.Dragonfly_Radius,
        adversary.x,
        0,
        Constants.Adversary_Width,
        adversary.gapY - Constants.Adversary_Gap_Height / 2
      )
    ) {
      return true
    }
    if (
      circleRect(
        Constants.Dragonfly_X,
        dragonflyY,
        Constants.Dragonfly_Radius,
        adversary.x,
        adversary.gapY + Constants.Adversary_Gap_Height / 2,
        Constants.Adversary_Width,
        Constants.Canvas_Height - adversary.gapY - Constants.Adversary_Gap_Height / 2
      )
    ) {
      return true
    }
  }
  return false
}

const jump = () => {
  if (gameStatus === GameStatus.GameOver) { // had status === GameStatus.GameOver, error status is deprecated
    resetGame()
    return
  }
  if (gameStatus === GameStatus.Waiting) {
    setStatus(GameStatus.Playing)
  }
  setVelocity(-Constants.Jump_Velocity)
}

const handleKeyPress = (e) => {
  if (e.code !== 'Space') {
    return
  }
  if (e.repeat) {
    return
  }
  jump()
}

useEffect(() => {
  document.addEventListener('keypress', handleKeyPress)
  document.addEventListener('click', jump)
  return () => {
    document.addEventListener('keypress', handleKeyPress)
    document.removeEventListener('click', jump)
  }
}, [gameStatus]) // initially had callback of status - status is deprecated

useTick((delta, ticker) => {
  const deltaTime = ticker.deltaMS / 1000
  applyDragonflyPhysics(deltaTime)
  if (gameStatus !== GameStatus.Playing) {
    return
  }
  moveAdversariesLeft(deltaTime)
  spawnNewAdversaries()
  deleteOffscreenAdversaries()

  if (groundCollision() || adversaryCollision()) {
    setStatus(GameStatus.GameOver)
  }
})

if (gameStatus === GameStatus.GameOver) {
  return (
    <>
      {adversaries.map((adversary, index) => {
        return <Adversary key={index} {...adversary} />
      })}
      <Ground />
      <Dragonfly height={dragonflyY} />
      <Score score={score} />
      <GameOver />
    </>
  )
}

return (
  <>
    {adversaries.map((adversary, index) => {
      return <Adversary key={index} {...adversary} />
    })}
    <Ground />
    <Dragonfly height={dragonflyY} />
    <Score score={ score } />
  </>
)

export default GamePlay
