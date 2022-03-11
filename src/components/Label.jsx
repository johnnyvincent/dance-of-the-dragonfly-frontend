import React, { Component } from 'react'
import './game.css'

class Label extends Component {
  render () {
    return (
      <React.Fragment>
        <p className="Label1">{this.props.LabelText1}</p>
        <p className="Label2">{this.props.LabelText2}</p>
      </React.Fragment>
    )
  }
}

export default Label
