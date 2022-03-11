import React, { Component } from 'react'
import dragonfly from '../assets/dragonfly.png'
import './game.css'

class Dragonfly extends Component {
  render () {
    return (
      <React.Fragment>
        <img
          src={dragonfly}
          alt='YO'
          id='dragonfly'
          style={{
            top: this.props.dragonflyPos,
            transform: 'rotate(' + this.props.dragonflyRotate + 'deg)'
          }}
        />
      </React.Fragment>
    )
  }
}

export default Dragonfly
