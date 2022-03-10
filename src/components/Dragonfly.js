import React from 'react'
import { View } from 'react-native'
import dragonflyImage from '../../assets/dragonfly.png'
// import Constants from '../Constant.js'

const Dragonfly = ({ dragonflyBottom, dragonflyLeft }) => {
  const dragonflyWidth = 50
  const dragonflyHeight = 60

  return (
    <View
      style={{
        position: 'absolute',
        left: dragonflyLeft - (dragonflyWidth / 2),
        bottom: dragonflyBottom,
        width: dragonflyWidth,
        height: dragonflyHeight
      }}
      resizeMode='contain'
      source={dragonflyImage}
    />
  )
}

export default Dragonfly
