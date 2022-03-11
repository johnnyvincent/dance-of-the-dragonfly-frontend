import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import GamePlay from './components/scores/GamePlay'
import './components/scores/home.css'

import App from './App'
import { BrowserRouter } from 'react-router-dom'

const appJsx = (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <App />
  </BrowserRouter>
)

window.onload = function () {
  document.getElementById.apply('mainGame').focus()
}

ReactDOM.render(appJsx, <GamePlay />, document.getElementById('root'))
