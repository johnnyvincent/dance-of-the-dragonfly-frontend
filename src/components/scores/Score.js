import React, { useState, useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Spinner, Button } from 'react-bootstrap'
import { deleteScore, showScore } from '../../api/score'
import { format } from 'timeago.js'
import './Score.css'

const Score = ({ user, msgAlert }) => {
  const [score, setScore] = useState(null)
  const [deleted, setDeleted] = useState(false)
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
        setScore(res.data.score)
        console.log(user)
      } catch (error) {
        msgAlert({
          heading: 'Score failed to load this is coming from (Score.js Error)',
          message: error.message,
          variant: 'danger'
        })
      }
    }
    fetchData()
  }, [])

  const handleDeleteClick = async () => {
    try {
      await deleteScore(id, user)
      setDeleted(true)
    } catch (error) {
      msgAlert({
        heading: 'Failed to delete Score',
        message: error.message,
        variant: 'danger'
      })
    }
  }

  // 3 states:
  // If score is `null`, we are loading
  if (!score) {
    return (
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    )
  } else if (deleted) {
    return <Navigate to='/scores' />
  } else {
    // We have a score, display it!
    return (
      <div className='post'>
        <div className='PostWrapper'>
          <h3>{score.score}
            <span className='postDate'>{format(score.createdAt)}</span>
          </h3>
          <p>Easy dub? : {score.score}</p>
          <p>{score.owner}</p>
          <Link to={`/scores/${id}/edit`}>
            <Button className='Bttn' variant='primary' type='submit'>Update Score </Button>
          </Link>
          <Button className='Bttn' variant='danger' onClick={handleDeleteClick}>Delete Score</Button>
        </div>
      </div>
    )
  }
}

export default Score
