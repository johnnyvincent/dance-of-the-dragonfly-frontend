import React, { Component } from 'react'
import './game.css'

class Score extends Component {
  render () {
    return (
      <React.Fragment>
        <p className="score">{this.props.score}</p>
      </React.Fragment>
    )
  }
}

export default Score
