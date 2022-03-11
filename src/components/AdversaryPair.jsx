import React, { Component } from 'react'
import './game.css'
import AdversaryLower from './AdversaryLower'
import AdversaryUpper from './AdversaryUpper'

class AdversaryPair extends Component {
  render () {
    // console.log(this.props);
    return (
      <React.Fragment>
        <AdversaryUpper
          pos={this.props.pos}
          upperAdversaryLength={this.props.upperAdversaryLength}
        />
        <AdversaryLower
          pos={this.props.pos}
          upperAdversaryLength={this.props.upperAdversaryLength}
        />
      </React.Fragment>
    )
  }
}

export default AdversaryPair
