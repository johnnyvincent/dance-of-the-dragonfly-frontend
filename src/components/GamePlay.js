import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Dimensions, TouchableWithoutFeedback, Image, ImageBackground } from 'react-native'
import Adversaries from './components/Adversaries'
import Dragonfly from './components/Dragonfly'
import pondBackground from './assets/pond-background.png'

const GamePlay = () => {
  const screenWidth = Dimensions.get('screen').width
  const screenHeight = Dimensions.get('screen').height

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
  const adversariesWidth = 60
  const obstaclesHeight = 300
  const gravity = 5
  const gap = 250

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
    if ((adversariesOne + (adversariesWidth / 2) < screenWidth / 2) && !firstPoint) {
      setScore(score => score + 1)
      setFirstPoint(true)
    }

    if (adversariesOne > -adversariesWidth) {
      adversariesOneTimerId = setInterval(() => {
        setAdversariesOne(adversariesOne => adversariesOne - 5)
      }, 30)
      return () => {
        clearInterval(adversariesTwoTimerId)
      }
    } else {
      setAdversariesTwo(screenWidth)
      setAdversariesOneHeight(-Math.random() * 100)
      setFirstPoint(null)
    }
  }, [adversariesOne]
  )
}
