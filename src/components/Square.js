import React from 'react';
import "./square.css";

function Square({handleClick}) {
  return (
    <button className="cell" onClick={handleClick}>

    </button>
  )
}

export default Square;