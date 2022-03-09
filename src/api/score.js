import axios from 'axios'
import apiUrl from '../apiConfig'

export const createScore = (score, user) => {
  return axios.post(
    `${apiUrl}/scores/`,
    {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }
  )
}

export const indexScores = (user) => {
  return axios.get(
    `${apiUrl}/scores/`,
    // Pass along the authorization which includes our user's token
    {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }
  )
}
export const indexUsersScores = (user) => {
  return axios.get(
    `${apiUrl}/scores/owner/`,
    // Pass along the authorization which includes our user's token
    {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }
  )
}

export const showScore = (id, user) => {
  return axios.get(`${apiUrl}/scores/${id}/`, {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const deleteScore = (id, user) => {
  return axios.delete(`${apiUrl}/scores/${id}`, {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const updateScore = (id, score, user) => {
  return axios.patch(
    `${apiUrl}/scores/${id}`,
    { score: { score } },
    {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }
  )
}
