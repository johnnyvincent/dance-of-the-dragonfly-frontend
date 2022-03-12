import React from 'react'
// import { Navigate } from 'react-router-dom'
// import GamePlay from './GamePlay'

// const authenticatedOptions = (
//   <>
//     <GamePlay />
//   </>
// )

// const unauthenticatedOptions = (
//   <>
//     <div>
//     Sign in to play!
//     </div>
//   </>
// )

const Home = () => {
  // if user is null, redirect to home page
  // Note: Must check before useEffect, since it needs user
  return (
    <div className='mainGame'>
      {/* <div>
        {user ? authenticatedOptions : unauthenticatedOptions}
        <GamePlay />
      </div> */}
    </div>
  )
}

export default Home
