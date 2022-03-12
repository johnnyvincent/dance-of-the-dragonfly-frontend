import React from 'react'
import { Form, Button } from 'react-bootstrap'
// import { SendCheck } from 'react-bootstrap-icons'

const ScoreForm = ({ handleSubmit, score, setScore }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId='score'>
      <Form.Label>Score</Form.Label>
      <Form.Control
        placeholder='Score'
        name='edit score'
        value={score}
        onChange={event => setScore(event.target.value)}
      />
    </Form.Group>
    <Button className='mt-2 Bttn' variant='primary' type='submit'>Submit </Button>
    <div className='mt-5 footer' >Input your score and dont cheat!</div>
  </Form>
)
export default ScoreForm
