import React from 'react'
// import { View } from 'react-native'
import birdImage from '../assets/bird.png'
import frogImage from '../assets/frog.png'
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
      <div>
        style={{
          position: 'absolute',
          left: adversariesOne,
          width: adversaryWidth,
          height: adversaryHeight,
          bottom: randomBottom + adversaryHeight + gap
        }}
        source={birdImage}
      </div>
      <div>
        style={{
          position: 'absolute',
          left: adversariesOne,
          width: adversaryWidth,
          height: adversaryHeight,
          bottom: randomBottom
        }}
        source={frogImage}
      </div>
    </>
  )
}

export default Adversaries
