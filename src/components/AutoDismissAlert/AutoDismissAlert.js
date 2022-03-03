import React, { useEffect, useState } from 'react'

// We have imported some custom styling for this alert
// Which will be off-topic, unless extra time at the end of the lesson.
import './AutoDismissAlert.scss'
import Alert from 'react-bootstrap/Alert'

function AutoDismissAlert ({ variant, heading, message }) {
  // create `show` state. When this is false, the Alert will be hidden from the screen.
  const [show, setShow] = useState(true)
  // We are going to create a timer that will stop showing the alert after 5 seconds
  // We store the timeoutId, incase we need to cancel the timer early (because the AutoDismissAlert was unmounted)
  const [timeoutId, setTimeoutId] = useState(null)
  console.log(timeoutId)

  // this will run once, when the component is mounted (added) to the screen
  // it runs once, because it has an empty dependency array as the second argument
  useEffect(() => {
    // We want to create a timer, that closes the alert after 5 seconds (5000 milliseconds)
    const id = setTimeout(() => setShow(false), 5000)
    // Keep track of the timeoutId
    setTimeoutId(id)

    // We want to clean up the timer
    // this is like componentWillUnmount, it is run whenever the component is unmounted
    // and its also run before an effect is re-created
    return function cleanup () {
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <Alert
      /* This is the color, make it the bootstrap passed down as a prop */
      variant={variant}
      /* This function sets the show state to false, whenever the x in the top right is clicked. */
      onClose={() => setShow(false)}
      /* This adds a close button to our alert */
      dismissible
      /* The show property will display the alert if true, and hide it if false. */
      show={show}
    >
      <div className='container'>
        <Alert.Heading>{heading}</Alert.Heading>
        <p className='alert-body'>{message}</p>
      </div>
    </Alert>
  )
}

export default AutoDismissAlert
