import React, { Component } from 'react'
import { Image } from 'react-native'
import birdImage from '../../assets/bird.png'
import frogImage from '../../assets/frog.png'
import Constants from '../Constant'

export default class Adversary extends Component {
  render () {
    const width = Constants.adversary_width
    const height = this.props.position[2]
    const x = this.props.position[0]
    const y = this.props.position[1]

    return (
      <>
        <Image
          style={{
            position: 'absolute',
            top: y,
            left: x,
            width: width,
            height: height,
            transform: [{ rotate: '180deg' }]
          }}
          resizeMode='stretch'
          source={birdImage}
        />
        <Image
          style={{
            position: 'absolute',
            top: y + height + Constants.adversary_gap,
            left: x,
            width: width,
            height: Constants.max_height -
            height -
            Constants.adversary_gap -
            Constants.ground_height
          }}
          resizeMode='stretch'
          source={frogImage}
        />
      </>
    )
  }
}
