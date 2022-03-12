import React, { useEffect, useState } from 'react'
import { indexUsersScores } from '../../api/score'
import { Link, Navigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { format } from 'timeago.js'
// import './Posts.css'
const OneUserAllScores = ({ user, msgAlert }) => {
  const [usersScores, setUsersScores] = useState([])

  if (!user) {
    return <Navigate to='/' />
  }

  useEffect(() => {
    const getAllScores = async () => {
      try {
        const res = await indexUsersScores(user)
        setUsersScores(res.data.scores)
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
    getAllScores()
  }, [])

  if (!usersScores.length) {
    return (
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    )
  }
  const scoreList = usersScores.map(score => (
    <div className='scores' key={score._id}>
      <Link to={`/scores/${score._id}`}>{score.score}</Link>
      <span className='scoreDate'>{format(score.createdAt)}</span>
      <h6>{score.text}</h6>
      <h6>{score.owner}</h6>
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

export default OneUserAllScores
