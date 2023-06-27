import React, { useState, useEffect, useCallback } from "react";
import Square from "./Square";
import Scoreboard from "./Scoreboard";

const Board = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [scores, setScores] = useState({ xscore: 0, oscore: 0 });
  const [winner, setWinner] = useState(null);

  const checkWinner = useCallback(() => {
    const winnerLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of winnerLines) {
      const [a, b, c] = line;
      if (
        state[a] !== null &&
        state[a] === state[b] &&
        state[a] === state[c]
      ) {
        return line;    
      }
    }
    return null;
  }, [state]);

  const updateScores = useCallback((winnerSymbol) => {
    setScores((prevScores) => ({
      ...prevScores,
      [`${winnerSymbol.toLowerCase()}score`]: prevScores[
        `${winnerSymbol.toLowerCase()}score`
      ] + 1,
    }));
  }, []);

  const handleWin = useCallback((winningLine) => {
    const winnerSymbol = state[winningLine[0]];
    updateScores(winnerSymbol);
    setWinner(winnerSymbol);
  }, [state, updateScores]);

  const handleDraw = useCallback(() => {
    setWinner("draw");
  }, []);

  

  const isBoardFull = useCallback(() => {
    return state.every((value) => value !== null);
  }, [state]);

  const handleSquareClick = useCallback(
    (index) => {
      if (state[index] !== null || winner === "X" || winner === "O") {
        return;
      }
      const updatedState = [...state];
      updatedState[index] = isXTurn ? "X" : "O";
      setState(updatedState);
      setIsXTurn(!isXTurn); 
    },
    [state, winner, isXTurn]
  );

  
  const handleReset = useCallback(() => {
    setState(Array(9).fill(null));
    setWinner(null);
  }, []);


  useEffect(() => {
    const winningLine = checkWinner();
    if (winningLine) {
      handleWin(winningLine);
    } else if (isBoardFull()) {
      handleDraw();
    }
  }, [checkWinner, handleWin, isBoardFull, handleDraw]);


  return (
    <div className="board-container">
      <Scoreboard scores={scores} xplaying={isXTurn} />
      {winner && (
        <>
          <div className="winner-message">
            {winner === "draw" ? "It's a draw!" : `${winner} won the game!`}
          </div>
          <button className="play-again-button" onClick={handleReset}>
            Play Again
          </button>
        </>
      )}
      {!winner && (
        <>
          <h4>Player {isXTurn ? "X" : "O"} please move</h4>
          <div className="board-row">
            <Square onClick={() => handleSquareClick(0)} value={state[0]} />
            <Square onClick={() => handleSquareClick(1)} value={state[1]} />
            <Square onClick={() => handleSquareClick(2)} value={state[2]} />
          </div>
          <div className="board-row">
            <Square onClick={() => handleSquareClick(3)} value={state[3]} />
            <Square onClick={() => handleSquareClick(4)} value={state[4]} />
            <Square onClick={() => handleSquareClick(5)} value={state[5]} />
          </div>
          <div className="board-row">
            <Square onClick={() => handleSquareClick(6)} value={state[6]} />
            <Square onClick={() => handleSquareClick(7)} value={state[7]} />
            <Square onClick={() => handleSquareClick(8)} value={state[8]} />
          </div>
        </>
      )}
      </div>
  );
};

export default Board;
