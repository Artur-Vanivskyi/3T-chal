import React from 'react'

function Button({resetGame}) {
  return (
   <button onClick={() => resetGame()}>Start Game</button>
  )
}

export default Button;