import React, { useState, useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import ScoreForm from './ScoreForm'
import { showScore, updateScore } from '../../api/score'

const ScoreEdit = ({ user, msgAlert }) => {
  const [score, setScore] = useState('')
  const [updated, setUpdated] = useState(false)
  const { id } = useParams()

  // if user is null, redirect to home page
  // Note: Must check before useEffect, since it needs user
  if (!user) {
    return <Navigate to='/' />
  }

  useEffect(() => {
    // When using async & await in a `useEffect` function
    // We have to wrap our `async` code in a function:
    // https://stackoverflow.com/a/53572588
    const fetchData = async () => {
      try {
        const res = await showScore(id, user)
        setScore(res.data.score.score)
      } catch (error) {
        msgAlert({
          heading: 'Failed to load score',
          message: error.message,
          variant: 'danger'
        })
      }
    }
    fetchData()
  }, [])

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      await updateScore(id, score, user)
      setUpdated(true)
    } catch (error) {
      msgAlert({
        heading: 'Failed to update score',
        message: error.message,
        variant: 'danger'
      })
    }
  }

  if (updated) {
    // Navigate to the 'show' page
    return <Navigate to={`/scores/${id}`} />
  }

  return (
    <div className='row'>
      <div className='col-sm-10 col-md-8 mx-auto mt-5'>
        <h3>Edit Score</h3>
        <ScoreForm
          handleSubmit={handleSubmit}
          score={score}
          setScore={setScore}
        />
      </div>
    </div>
  )
}

export default ScoreEdit
