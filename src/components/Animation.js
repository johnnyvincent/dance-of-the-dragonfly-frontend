import Constants from '../Constant'

let pause = false
let dragonflyJump = 0
let gravity = 0
let prevTime = 0
let scored = false

// function to pause the game-play, dragonfly stops falling, cannot be moved
// by clicking
export const stopGame = () => {
  gravity = 0
  dragonflyJump = 0
  scored = false
  pause = true
}

// function to begin the game only difference from pause function is different boolean
export const startGame = () => {
  gravity = 0
  dragonflyJump = 0
  scored = false
  pause = true
}

// function to randomize adversary placement

export const adversaryRandomizer = () => {
  const min = Constants.adversary_min
  const max = Constants.max_height - Constants.adversary_gap
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const gameControl = (entities, { time, touches, dispatch }) => {
  // check to see if game is being played
  if (!pause) {
    Object.keys(entities).forEach(key => {
      const dragonfly = entities['1']
      const body = entities[key]
      // check to see if dragonfly hit the ground
      if (body.name === 'floor') {
        if (dragonfly.position[1] + Constants.dragonfly.height / 2 >= body.position[1]) {
          dispatch({ type: 'game-over' })
        }
        body.position[0] -= 1
        if (body.position[0] <= -Constants.max_width) {
          body.position[0] = Constants.max_width
        }
      } else if ((body.name === 'bird' || 'frog') && gravity !== 0) {
        if (
          dragonfly.position[0] - Constants.dragonfly_width / 2 >
                body.position[0] + Constants.adversary_width && !scored
        ) {
          scored = true
          dispatch({ type: 'score' })
        }
        // check for collisions with adversaries
        const dpx = dragonfly.position[0]
        const dpy = dragonfly.position[1]
        const apx = dragonfly.position[0]
        if (
          dpx + Constants.dragonfly_width / 2 >= apx &&
                dpx - Constants.dragonfly_width / 2 <= apx + Constants.adversary_width
        ) {
          if (
            dpy - Constants.dragonfly_height / 2 <= body.position[2] ||
            dpy + Constants.dragonfly_height / 2 >=
            body.position[2] + Constants.adversary_gap
          ) {
            dispatch({ type: 'game-over' })
          }
        }
        if (body.position[0] <= -Constants.adversary_width) {
          scored = false
          body.position[2] = adversaryRandomizer()
          body.position[0] = Constants.max_width * 2 - Constants.adversary_width
        }
        body.position[0] -= 1
      } else {
        body.position[1] += gravity - dragonflyJump
        if (time.current - prevTime >= 500) {
          prevTime = time.current
          body.pose = (body.pose + 1) % 3
        }
        if (dragonflyJump > 0) {
          dragonflyJump--
        }
      }
    })
  }
  touches.forEach(t => {
    if (gravity === 0) {
      gravity = 5.4
    }
    if (!(entities['1'].position[1] < 40)) {
      dragonflyJump = gravity * 2
    }
  })
  return entities
}
