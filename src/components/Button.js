import React from "react";

function Button({ resetGame, className, name }) {
  return (
    <button onClick={() => resetGame()} className={className}>
      {name}
    </button>
  );
}

export default Button;
