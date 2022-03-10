import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, Dimensions, TouchableWithoutFeedback, ImageBackground } from 'react-native'
import Adversaries from './components/Adversaries'
import Dragonfly from './components/Dragonfly'
import pondBackground from './assets/pond-background.png'

export default function GamePlay () {
  const screenWidth = Dimensions.get('screen').width
  const screenHeight = Dimensions.get('screen').height

  // create value for state of Dragonfly to enable gravity
  const [dragonflyBottom, setDragonflyBottom] = useState(screenHeight / 2)
  const [adversariesOne, setAdversariesOne] = useState(screenWidth)
  const [adversariesTwo, setAdversariesTwo] = useState(screenWidth + screenWidth / 2 + 30)
  const [adversariesOneHeight, setAdversariesOneHeight] = useState(0)
  const [adversariesTwoHeight, setAdversariesTwoHeight] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [firstPoint, setFirstPoint] = useState(null)
  const [secondPoint, setSecondPoint] = useState(null)

  const dragonflyLeft = screenWidth / 2
  const adversaryWidth = 60
  const adversaryHeight = 300
  const gravity = 5
  const gap = 200
  // set game timer as a global variable
  let gameTimerId
  let adversariesOneTimerId
  let adversariesTwoTimerId

  // create falling effect for dragonfly where dragonfly drops 3 pixels every 30 milliseconds
  useEffect(() => {
    if (dragonflyBottom > 0) {
      gameTimerId = setInterval(() => {
        setDragonflyBottom(dragonflyBottom => dragonflyBottom - gravity)
      }, 30)

      return () => {
        clearInterval(gameTimerId)
      }
    }
  }, [dragonflyBottom])
  // create jump effect where dragonfly jumps fifty pixels upwards when screen is pressed
  const jump = () => {
    if (!isGameOver && (dragonflyBottom < screenHeight)) {
      setDragonflyBottom(dragonflyBottom => dragonflyBottom + 50)
    }
  }

  // create first set of adversaries
  useEffect(() => {
    if ((adversariesOne + (adversaryWidth / 2) < screenWidth / 2) && !firstPoint) {
      setScore(score => score + 1)
      setFirstPoint(true)
    }

    if (adversariesOne > -adversaryWidth) {
      adversariesOneTimerId = setInterval(() => {
        setAdversariesOne(adversariesOne => adversariesOne - 5)
      }, 30)
      return () => {
        clearInterval(adversariesOneTimerId)
      }
    } else {
      setAdversariesOne(screenWidth)
      // randomize adversary heights
      setAdversariesOneHeight(-Math.random() * 100)
      setFirstPoint(null)
    }
  }, [adversariesOne]
  )

  // create second set of adversaries
  useEffect(() => {
    if ((adversariesTwo + (adversaryWidth / 2) < screenWidth / 2) && !secondPoint) {
      setScore(score => score + 1)
      setSecondPoint(true)
    }

    if (adversariesTwo > -adversaryWidth) {
      adversariesTwoTimerId = setInterval(() => {
        setAdversariesTwo(adversariesTwo => adversariesTwo - 5)
      }, 30)
      return () => {
        clearInterval(adversariesTwoTimerId)
      }
    } else {
      setAdversariesTwo(screenWidth)
      setAdversariesTwoHeight(-Math.random() * 100)
      setSecondPoint(null)
    }
  }, [adversariesTwo])

  // check for collisions

  useEffect(() => {
    if (
      (
        (
          dragonflyBottom < (adversariesOneHeight + adversaryHeight + 30) ||
          dragonflyBottom > (adversariesOneHeight + adversaryHeight + gap - 30)
        ) &&
    (
      adversariesOne > screenWidth / 2 - 30 &&
      adversariesOne < screenWidth / 2 + 30
    )
      ) ||
      (
        (
          dragonflyBottom < (adversariesTwoHeight + adversaryHeight + 30) ||
          dragonflyBottom > (adversariesTwoHeight + adversaryHeight + gap - 30)

        ) &&
      (
        adversariesTwo > screenWidth / 2 - 30 &&
        adversariesTwo < screenWidth / 2 + 30
      )
      )
    ) {
      console.log('game over')
      gameOver()
    }
  })

  const gameOver = () => {
    clearInterval(gameTimerId)
    clearInterval(adversariesOneTimerId)
    clearInterval(adversariesTwoTimerId)
    setIsGameOver(true)
  }

  return (
    <TouchableWithoutFeedback onPress={() => jump()}>
      <ImageBackground style={styles.container} source={pondBackground} resizeMode={'contain'}>
        <Text>Score:{score}</Text>
        <Dragonfly
          dragonflyBottom={dragonflyBottom}
          dragonflyLeft={dragonflyLeft}
        />
        <Adversaries
          adversariesOne={adversariesOne}
          adversaryWidth={adversaryWidth}
          adversaryHeight={adversaryHeight}
          randomBottom={setAdversariesOneHeight}
          gap={gap}
        />
        <Adversaries
          adversariesOne={adversariesTwo}
          adversaryWidth={adversaryWidth}
          adversaryHeight={adversaryHeight}
          randomBottom={setAdversariesTwoHeight}
          gap={gap}
        />
      </ImageBackground>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
