import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { createScore } from '../../api/score'
import ScoreForm from './ScoreForm'

const ScoreCreate = ({ user, msgAlert }) => {
  const [score, setScore] = useState('')
  const [createdId, setCreatedId] = useState(null)

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const res = await createScore(score, user)
      setCreatedId(res.data.score._id)
      console.log(score)
      msgAlert({
        heading: 'Score Created',
        message: `Created ${score.owner}'s score successfully.`,
        variant: 'success'
      })
    } catch (error) {
      msgAlert({
        heading: 'Failed to create Score',
        message: error.message,
        variant: 'danger'
      })
    }
  }

  // if user is null, redirect to home page
  if (!user) {
    return <Navigate to='/' />
  } else if (createdId) {
    // if movie has been created,Navigate to the 'show' page
    return <Navigate to={`/scores/${createdId}`} />
  }
  return (
    <div className='row'>
      <div className='col-md-3 mx-auto mt-5'>
        <h3>Create Score</h3>
        <ScoreForm
          handleSubmit={handleSubmit}
          score={score}
          setScore={setScore}
        />
      </div>

    </div>
  )
}

export default ScoreCreate
