import React from 'react';
import "./game.css";


function Game() {
  return (
   <>
      <div className="board" id="board">
        <div className="cell" data-cell></div>
        <div className="cell" data-cell></div>
        <div className="cell" data-cell></div>
        <div className="cell" data-cell></div>
        <div className="cell" data-cell></div>
        <div className="cell" data-cell></div>
        <div className="cell" data-cell></div>
        <div className="cell" data-cell></div>
        <div className="cell" data-cell></div>
    </div>
   </>
  )
}

export default Game;