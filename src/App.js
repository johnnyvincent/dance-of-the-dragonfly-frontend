/* eslint-disable no-tabs */
import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
// import { NavigationContainer } from '@react-navigation/native'

import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'

import Home from './components/scores/Home'
import Scores from './components/scores/Scores'
import OneUserAllScores from './components/scores/OneUserAllScores'
import ScoreCreate from './components/scores/ScoreCreate'
import Score from './components/scores/Score'

const App = () => {
  const [user, setUser] = useState(null)
  const [msgAlerts, setMsgAlerts] = useState([])

  const clearUser = () => setUser(null)

  const msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    setMsgAlerts(msgAlerts => ([...msgAlerts, { heading, message, variant, id }]))
  }

  return (
    <>
      <Header user={user} />
      {msgAlerts.map(msgAlert => (
        <AutoDismissAlert
          key={msgAlert.id}
          heading={msgAlert.heading}
          variant={msgAlert.variant}
          message={msgAlert.message}
          id={msgAlert.id}
        />
      ))}
      <main className='container'>
        <Routes>
          <Route
            exact path='/'
            render={() => (
              <Home msgAlert={this.msgAlert} setUser={this.setUser} />
            )}
          />
          <Route
            path='/sign-up'
            element={<SignUp msgAlert={msgAlert} setUser={setUser} /> }
          />
          <Route
            path='/sign-in'
            element={<SignIn msgAlert={msgAlert} setUser={setUser} /> }
          />
          <Route
            path='/sign-out'
            element={<SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} /> }
          />
          <Route
            path='/change-password'
            element={<ChangePassword msgAlert={msgAlert} user={user} /> }
          />
          <Route
            user={user}
            path='/scores/create'
            render={() => (
              <ScoreCreate msgAlert={this.msgAlert} user={user} />
            )}
          />
          <Route
            user={user}
            path='/scores/owner'
            render={() => (
              <OneUserAllScores msgAlert={this.msgAlert} user={user} />
            )}
          />
          <Route
            user={user}
            path='/scores/:id'
            render={() => (
              <Score msgAlert={this.msgAlert} user={user} />
            )}
          />
          <Route
            user={user}
            path='/scores'
            render={() => (
              <Scores msgAlert={this.msgAlert} user={user} />
            )}
          />
        </Routes>
      </main>
    </>
  )
}

export default App
