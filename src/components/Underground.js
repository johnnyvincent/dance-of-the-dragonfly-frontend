import React, { Component } from 'react'
import { Image } from 'react-native'
import Constants from '../Constant.js'
import undergroundImage from '../../assets/underground.png'

export default class Floor extends Component {
  constructor (props) {
    super(props)

    this.width = Constants.max_width
    this.height = Constants.underground_height
  }

  render () {
    const x = this.props.position[0]
    const y = this.props.position[1]
    return (
      <Image
        style={{
          position: 'absolute',
          width: this.width,
          height: this.height,
          top: y,
          left: x
        }}
        resizeMode="stretch"
        source={undergroundImage}
      />
    )
  }
}
