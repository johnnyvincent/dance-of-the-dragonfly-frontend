import React, { Component } from 'react'
import net2 from '../assets/vertical-net2.png'
import './game.css'

class AdversaryUpper extends Component {
  render () {
    return (
      <React.Fragment>
        <img
          src={net2}
          alt='netReachingDown'
          className='adversaryUpper'
          style={{
            left: this.props.pos,
            height: this.props.upperAdversaryLength
          }}
        />
      </React.Fragment>
    )
  }
}

export default AdversaryUpper
