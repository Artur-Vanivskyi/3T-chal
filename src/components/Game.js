import React, { useState } from 'react'

function Game() {

    const [cells, setCells] = useState([]);
    const [turn, setTurn] = useState("X");
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

    const endGame = () => {
        let isTheEndGame = true;
        cells.forEach(cell => {
            if(!cell){
                isTheEndGame = false;
            }
        })
        return isTheEndGame;
    }

      const checkWinner = () => {
       
        const winSet = WINNING_COMBINATIONS.find((combination) => {
            const [a, b, c] = combination;
            return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
        });

        return winSet ? cells[winSet[0]] : null;
        
      }

      const handleClick = (event) => {
        const c = cells;

        c[event.target] = turn;
        setCells(c);
        setTurn(turn === "X" ? "O" : "X");
        const win = checkWinner();
        if(win){
            setWinner(win);
        }else if(endGame()){
            setWinner("X | O");
        };

      };


      const resetGame = () => {
        setCells([]);
        setTurn("X");
        setWinner(null);
      }




  return (
    <div>Game</div>
  )
}

export default Game;