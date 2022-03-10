import React, { useEffect, useState } from 'react'
import { indexScores } from '../../api/score'
import { Link, Redirect } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { format } from 'timeago.js'
import './Scores.css'
const Scores = ({ user, msgAlert }) => {
  const [scores, setScores] = useState([])

  if (!user) {
    return <Redirect to='/' />
  }

  useEffect(() => {
    const getScores = async () => {
      try {
        const response = await indexScores(user)
        setScores(response.data.scores)
      } catch (error) {
        // Alert the user, that they failed to sign up
        msgAlert({
          heading: 'Scores Cant be displayed: ' + error.message,
          message: 'Cant index Scores',
          // this will be red
          variant: 'danger'
        })
      }
    }
    getScores()
  }, [])

  if (scores.length === 0) {
    return (
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    )
  }
  const scoreList = scores.map(score => (
    <div className='scores' key={score._id}>
      <Link to={`/scores/${score._id}`}>{score.score}</Link>
      <span className='scoreDate'>{format(score.createdAt)}</span>
      <h6>{score.score}</h6>
      <h6>User {score.owner} Score</h6>
    </div>
  ))

  return (
    <div className='row'>
      <div className='col-sm-10 col-md-8 mx-auto mt-5'>
        <h3>Scores</h3>
        <ul>{scoreList}</ul>
      </div>
    </div>
  )
}

export default Scores
