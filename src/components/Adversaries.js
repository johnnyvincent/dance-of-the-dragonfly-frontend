import React from 'react'
import { View } from 'react-native'
import birdImage from '../../assets/bird.png'
import frogImage from '../../assets/frog.png'
// import Constants from '../Constant'

const Adversaries = ({
  adversariesOne,
  adversaryWidth,
  adversaryHeight,
  gap,
  randomBottom
}) => {
  return (
    <>
      <View
        style={{
          position: 'absolute',
          left: adversariesOne,
          width: adversaryWidth,
          height: adversaryHeight,
          bottom: randomBottom + adversaryHeight + gap
        }}
        resizeMode='stretch'
        source={birdImage}
      />
      <View
        style={{
          position: 'absolute',
          left: adversariesOne,
          width: adversaryWidth,
          height: adversaryHeight,
          bottom: randomBottom
        }}
        resizeMode='stretch'
        source={frogImage}
      />
    </>
  )
}

export default Adversaries
