import React, { useEffect, useState } from "react";
import Button from "./Button";
import Cell from "./Cell";

function Game() {
  const initialArray = Array(9).fill("");
  const [cells, setCells] = useState(initialArray);
  const [turn, setTurn] = useState("x");
  const [winner, setWinner] = useState(null);

  const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = () => {
    const winSet = WINNING_COMBINATIONS.find((combination) => {
      const [a, b, c] = combination;
      return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
    });

    return winSet ? cells[winSet[0]] : null;
  };

  const checkEndTheGame = () => {
    let isTheEndGame = true;
    cells.forEach((cell) => {
      if (!cell) {
        isTheEndGame = false;
      }
    });
    return isTheEndGame;
  };

  const updateCells = (ind) => {
    if (cells[ind] || winner) {
      return;
    }

    const s = cells;
    s[ind] = turn;
    setCells(s);

    setTurn(turn === "x" ? "o" : "x");
    const win = checkWinner();
    if (win) {
      setWinner(win);
    } else if (checkEndTheGame()) {
      setWinner("x | o");
    }
  };

  const resetGame = () => {
    setCells(initialArray);
    setTurn("x");
    setWinner(null);
  };

  const minimax = (cells, depth, isMaximizingPlayer) => {
    const winner = checkWinner();
    if (winner !== null) {
      return winner === "o" ? 10 - depth : depth - 10;
    }

    if (checkEndTheGame()) {
      return 0;
    }

    if (isMaximizingPlayer) {
      let maxEval = -Infinity;
      for (let i = 0; i < cells.length; i++) {
        if (cells[i] === "") {
          cells[i] = "o";
          const evaluation = minimax(cells, depth + 1, false);
          cells[i] = "";
          maxEval = Math.max(maxEval, evaluation);
        }
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let i = 0; i < cells.length; i++) {
        if (cells[i] === "") {
          cells[i] = "x";
          const evaluation = minimax(cells, depth + 1, true);
          cells[i] = "";
          minEval = Math.min(minEval, evaluation);
        }
      }
      return minEval;
    }
  };

  const bestMove = () => {
    let bestEval = -Infinity;
    let move = null;
    for (let i = 0; i < cells.length; i++) {
      if (cells[i] === "") {
        cells[i] = "o";
        const evaluation = minimax(cells, 0, false);
        cells[i] = "";
        if (evaluation > bestEval) {
          bestEval = evaluation;
          move = i;
        }
      }
    }
    updateCells(move);
  };

  useEffect(() => {
    if (turn === "o") {
      bestMove();
    }
  }, [turn]);

  return (
    <div className="tic-tac-toe">
      <h1> TIC-TAC-TOE </h1>
      <Button className="topBtn" resetGame={resetGame} />
      <div className="game">
        {Array.from("012345678").map((ind) => (
          <Cell
            key={ind}
            ind={ind}
            updateCells={updateCells}
            clsName={cells[ind]}
          />
        ))}
      </div>
      {winner && (
        <div className="winner">
          <div className="text">
            <h2>
              {winner === "x"
                ? "You won!"
                : winner === "o"
                ? "You lost!"
                : "No winner"}
            </h2>
            <div>
              <Button className="bottomBtn" resetGame={resetGame} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;
