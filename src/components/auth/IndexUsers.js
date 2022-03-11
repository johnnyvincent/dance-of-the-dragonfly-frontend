import React, { useEffect, useState } from 'react'
import { indexUser } from '../../api/auth'
import { Link, Navigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { format } from 'timeago.js'

const AllUsers = ({ user, msgAlert }) => {
  const [allUsers, setAllUsers] = useState([])

  if (!user) {
    return <Navigate to='/' />
  }

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await indexUser(user)
        setAllUsers(response.data.users)
      } catch (error) {
        // Alert the user, that they failed to sign up
        msgAlert({
          heading: 'Users Cant be displayed: ' + error.message,
          message: 'Cant index Users',
          // this will be red
          variant: 'danger'
        })
      }
    }
    getUsers()
  }, [])

  if (allUsers.length === 0) {
    return (
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    )
  }
  const userList = allUsers.map(user => (
    <div className='scores' key={user._id}>
      <Link to={`/scores/${user._id}`}>{user.title}</Link>
      <span className='scoreDate'>{format(user.createdAt)}</span>
      <h6>{user.email}</h6>
    </div>
  ))

  return (
    <div className='row'>
      <div className='col-sm-10 col-md-8 mx-auto mt-5'>
        <h3>All Users</h3>
        <ul>{userList}</ul>
      </div>
    </div>
  )
}

export default AllUsers
