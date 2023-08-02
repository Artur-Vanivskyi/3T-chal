import React, { useEffect, useState } from "react";
import Button from "./Button";
import Cell from "./Cell";
import { WINNING_COMBINATIONS } from "../utils/utils";

function Game() {
  const initialArray = Array(9).fill("");

  // Setting the states
  const [cells, setCells] = useState(initialArray);
  const [turn, setTurn] = useState("x");
  const [winner, setWinner] = useState(null);
  const [visible, setVisible] = useState(false);

  // Function to check for a winner going thru all combinations
  const checkWinner = () => {
    const winSet = WINNING_COMBINATIONS.find((combination) => {
      const [a, b, c] = combination;
      return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
    });

    // ---------- //
    if(winSet){
      return cells[winSet[0]];
    }else {
      return null;
    }
    // ---------- //

    //return winSet ? cells[winSet[0]] : null;
  };

  const checkEndTheGame = () => {
    let isTheEndGame = true;
    // check each cell in the array
    cells.forEach((cell) => {
      // if any cell is empty, the game is not over yet
      if (!cell) {
        isTheEndGame = false;
      }
    });

    return isTheEndGame;
  };

  const updateCells = (ind) => {
    // check if the cell is filled (taken) or there is winner already, in this case do nothing
    if (cells[ind] || winner) {
      return;
    }

    const s = cells; // copying array to a new variable
    s[ind] = turn;
    setCells(s); // updating the cells state

   // ---------- //
   if(turn === "x"){
    setTurn("o");
   }else{
    setTurn("x");
   }
   // ---------- //
   
    //setTurn(turn === "x" ? "o" : "x"); // switch the turn
    const win = checkWinner();

    if (win) {
      setWinner(win); // set the winner if there is one
    } else if (checkEndTheGame()) {
      setWinner("x | o"); // no winner, set a tie
    }
  };

  // reset game, put all states to the initial values
  const resetGame = () => {
    setCells(initialArray);
    setTurn("x");
    setWinner(null);
  };

  // minimax algorithm
  const minimax = (cells, depth, isMaxPlayer) => {
    const winner = checkWinner();
    if (winner !== null) {
      return winner === "o" ? 10 - depth : depth - 10;
    }

    if (checkEndTheGame()) {
      return 0;
    }

    if (isMaxPlayer) {
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

  const getAvailableMoves = (board) => {
    const availableMoves = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        availableMoves.push(i);
      }
    }
    return availableMoves;
  };

  const bestMove = () => {
    const randomNumber = Math.random(); // Generate a random number between 0 and 1

    if (randomNumber < 0.1) {
      makeRandomMove();
    } else {
      makeBestMove();
    }
  };
  // Random move to give a chance to the player to win again AI

  const makeRandomMove = () => {
    const availableMoves = getAvailableMoves(cells);
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    const randomMove = availableMoves[randomIndex];
    cells[randomMove] = "o";
    updateCells(cells);
  };

  const makeBestMove = () => {
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

    cells[move] = "o";
    updateCells(cells);
  };

  useEffect(() => {
    if (turn === "o") {
      bestMove();
    }
  }, [turn]);

  return (
    <div className="tic-tac-toe">
      <h1>TIC-TAC-TOE</h1>
      {visible && (
        <Button className="topBtn" resetGame={resetGame} name="Reset" />
      )}
      <div className="game">
        {Array.from("012345678").map((ind) => (
          <Cell
            key={ind}
            ind={ind}
            updateCells={updateCells}
            clsName={cells[ind]}
            setVisible={setVisible}
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
              <Button
                className="bottomBtn"
                resetGame={resetGame}
                name="New Game"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;
