import React from 'react'
import { Link } from 'react-router-dom'
import GamePlay from '../GamePlay'

const Home = () => (

  <div className="txtwrapper">
    <div className="static-txt"></div>
    <ul className="dynamic-txts">
      <li><span>Welcome to Dance of the Dragonfly! Click DANCE below!</span></li>
      <GamePlay />
      <Link to="/play">DANCE</Link>
      <Link to="/scores">See Your Scores</Link>
    </ul>

  </div>

)

export default Home
