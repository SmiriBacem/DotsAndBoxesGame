import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../css/home.css";

export const Home = () => {
  const [gameSize, setGameSize] = useState(0);
  const history = useHistory();
  const handleClick = () => {
    if (gameSize < 2 || gameSize > 8) {
      alert("Game size should be between 2 and 7");
    } else {
      history.push({ pathname: "/game", state: { gameSize } });
    }
  };
  return (
    <div>
      <h5>PLease fill in the field to start a new game</h5>
      <input
        type="number"
        value={gameSize}
        onChange={(e) => setGameSize(e.target.value)}
      />
      <button onClick={handleClick}>Start Game</button>
    </div>
  );
};
