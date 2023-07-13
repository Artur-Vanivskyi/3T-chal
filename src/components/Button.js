import React from "react";

function Button({ resetGame, className, name, visible}) {
  return (
    <button onClick={() => resetGame()} className={className} visible={visible} >
      {name}
    </button>
  );
}

export default Button;
