import React from "react";

function Button({ resetGame, className }) {
  return (
    <button onClick={() => resetGame()} className={className}>
      Start Game
    </button>
  );
}

export default Button;
