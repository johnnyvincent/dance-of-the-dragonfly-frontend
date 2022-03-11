import React, { Component } from 'react'
import underground from '../assets/underground.png'
import './game.css'

class Underground extends Component {
  render () {
    return (
      <React.Fragment>
        <img src={underground} alt="underground" id="underground" />
      </React.Fragment>
    )
  }
}

export default Underground
