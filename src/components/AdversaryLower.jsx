import React, { Component } from 'react'
import net1 from '../assets/vertical-net1.png'
import './game.css'

class AdversaryLower extends Component {
  render () {
    return (
      <React.Fragment>
        <img
          src={net1}
          alt='netGoingUp'
          className='adversaryLower'
          style={{
            left: this.props.pos,
            height: 667 - (this.props.upperAdversaryLength + 116),
            top: 2 * this.props.upperAdversaryLength + 116 - this.props.upperAdversaryLength
          }}
        />
      </React.Fragment>
    )
  }
}

export default AdversaryLower
