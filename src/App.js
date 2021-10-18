import React, { useState, useEffect } from "react";
import Player from "./player";
import "./App.css";

const weapons = ["rock", "paper", "scissors"];
const App = () => {
  const [state, setState] = useState({
    player: weapons[0],
    computer: weapons[0],
    winner: "",
  });
  const [score, setScore] = useState(0);

  const startGame = () => {
    let counter = 0;
    let gameInterval = setInterval(() => {
      counter++;
      setState({
        ...state,
        computer: weapons[Math.floor(Math.random() * weapons.length)],
        winner: "",
      });
      if (counter > 5) {
        clearInterval(gameInterval);
        setState({
          ...state,
          winner: selectWinner(),
        });
      }
    }, 100);
  };

  useEffect(() => {
    if (state.winner === "You Won :)") {
      setScore(score + 1);
    } else if (state.winner === "You Lose :(") {
      setScore(score - 1);
    }
  }, [state.winner]);

  const selectWinner = () => {
    const { player, computer } = state;

    if (player === computer) {
      return "Oops it's a Tie!";
    } else if (
      (player === "rock" && computer === "scissors") ||
      (player === "scissors" && computer === "paper") ||
      (player === "paper" && computer === "rock")
    ) {
      return "You Won :)";
    } else {
      return "You Lose :(";
    }
  };

  const selectWeapon = (weapon) => {
    setState({
      ...state,
      player: weapon,
      winner: "",
    });
  };
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Rock Paper Scissors</h1>
      <p style={{ textAlign: "center" }}>
        Click on your choice and then click on start
      </p>
      <div>
        <Player weapon={state.player} />
        <Player weapon={state.computer} />
      </div>
      <div className="buttons">
        <button className="weaponBtn" onClick={() => selectWeapon("rock")}>
          rock
        </button>
        <button className="weaponBtn" onClick={() => selectWeapon("paper")}>
          paper
        </button>
        <button className="weaponBtn" onClick={() => selectWeapon("scissors")}>
          scissor
        </button>
      </div>

      <button type="button" onClick={startGame} style={{ marginTop: "20px" }}>
        Start!
      </button>
      <div className="winner">{state.winner ? selectWinner() : null}</div>
      <div className="score">
        {score === 0 ? "Your Score is 0" : `Your Score is ${score}`}
      </div>
    </>
  );
};

export default App;
