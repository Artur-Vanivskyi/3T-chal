import React, {useState, useEffect} from 'react';
import Board from './Board';

function Game() {

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

      const [arr, setArr] = useState([]);
      const [usersTurn, setUsersTurn] = useState(true);
      const [message, setMessage] = useState("");

      useEffect(() => {
        if(arr.length >= 5){
            const winnerCheck = (playerIndex) => {
                let arr2 = arr.filter((value, ind) => ind % 2 === playerIndex);

                WINNING_COMBINATIONS.forEach((combination) => {
                    if(combination.every((element) => arr2.includes(element))){
                        if(playerIndex === 0){
                            setMessage("You won");
                        }else{
                            setMessage("PC won");
                        }
                    }
                })
            };

            winnerCheck(0);
            winnerCheck(1);
        }

        if(arr.length === 9 && !message){
            setMessage("A tie!");
        }
      }, [arr, message]);

const userMove = (event) => {
    if(event.target.firstChild.innerHTML === '' && !message && usersTurn){
        event.target.firstChild.innerHTML = 'X';
        const squareIndex = parseInt(event.target.getAttribute('number'));
        setArr((prevArr) => [...prevArr, squareIndex]);
        setUsersTurn(false);
    }
};









  return (
    <div><Board /></div>
  )
}

export default Game;