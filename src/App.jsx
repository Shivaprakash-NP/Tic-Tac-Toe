import React, { useState } from "react";
import "./index.css";
var hello = 0;
var newbod;
function TicTacToe() {
  const [bod, setBod] = useState([
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
  ]);
  const [P, setP] = useState("X");
  const [msg, setMsg] = useState(` ${P}'s Move`);
  const [isActive, setIsActive] = useState(false);
  const [winningCells, setWinningCells] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(`url('/bg.png')`);
  const [sX, setsX] = useState(0);
  const [sO, setsO] = useState(0);
  function iswon(newBod) {
    const winCombinations = [
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]],
    ];

    for (const combination of winCombinations) {
      const [a, b, c] = combination;
      if (
        newBod[a[0]][a[1]] === P &&
        newBod[b[0]][b[1]] === P &&
        newBod[c[0]][c[1]] === P
      ) {
        setWinningCells(combination); 
        setBackgroundImage(`url('/wi.png')`);

        if (P === "X") {
          setsX(sX + 1); 
        } else {
          setsO(sO + 1);
        }
        return true;
      }
    }
    return false;
  }

  function isdraw() {
    return newbod.every(row => row.every(cell => cell !== " "));
  }

  function Handle(i, j) {
    if (isActive || bod[i][j] !== " ") {
      return;
    }
    if (bod[i][j] === " ") {
      newbod = bod.map(row => row.slice());
      newbod[i][j] = P;
      setBod(newbod);
      if (iswon(newbod)) {
        setMsg(`${P} WON !`);
        setIsActive(true); 
        setBackgroundImage(`url('/wi.png')`);
        return;
      } else if (isdraw()) {
        setMsg("Match Draw");
        setIsActive(true); 
        return;
      }
      const nP = P === "X" ? "O" : "X";
      setP(nP);
      setMsg(` ${nP}'s Move`);
    }
  }

  function nG() {
    setsO(0);
    setsX(0);
    setP("X");
    hello=1

    rE();
  }
 
  function rE() {
    setBod([
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "]
    ]);
    if(hello==0)
    {
      setP(P === "X" ? "O" : "X");
      setMsg(`${P === "X" ? "O" : "X"}'s Move`);
    }
    setWinningCells([]);
    setIsActive(false);
    setBackgroundImage(`url('/bg.png')`);
  }

  return (
    <div className={"game-container"} style={{ backgroundImage: backgroundImage , height : "100vh" }}>
      <h1 className="H">TIC - TAC - TOE</h1>
      <h1 className="status-message">{msg}</h1>
      <div className="game-board">
        {bod.map((row, i) => (
          <div key={i} className="game-row">
            {row.map((col, j) => (
              <button
                className={`cell ${
                  winningCells.some(([x, y]) => x === i && y === j) ? "winning-cell" : ""
                } ${isActive ? "gameover" : ""}`}
                key={j}
                onClick={() => Handle(i, j)}
              >
                {col}
              </button>
            ))}
          </div>
        ))}
      </div>
      {isActive && (
        <div>
          <button className="reset-button" onClick={rE}>
            Play Again
          </button>
        </div>
      )}
        <div className="score">
          <table>
            <thead>
              <tr>
                <th>Player</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>X</td>
                <td>{sX}</td>
              </tr>
              <tr>
                <td>O</td>
                <td>{sO}</td>
              </tr>
            </tbody>
          </table>
          <button className="Reset"  onClick={nG}>
            Reset
          </button>
        </div>
    </div>
  );
  
}

export default TicTacToe;