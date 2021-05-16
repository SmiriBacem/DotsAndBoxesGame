import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "../css/game.css";
import { checkSquare, makeBoard, makeWinMessage } from "../helper/functions";

const Game = () => {
  //Set State for our App
  const [numPlayerOne, setnumPlayerOne] = useState(0);
  const [numPlayerTwo, setnumPlayerTwo] = useState(0);
  const [boardSize, setboardSize] = useState(2);
  const [turn, setturn] = useState("player1");
  const [lineCoordinates, setlineCoordinates] = useState({});
  const [boxColors, setboxColors] = useState({});
  const history = useHistory();

  useEffect(() => {
    setboardSize(history.location.state.gameSize);
    // Fill the matrix initially with value of 0 => Set lineCoordinates object
    // First loop increments i to i== 0 then i == 1
    // Second loop increments j, from j == o to j == borderSize     ( exemple : 0 to 5)
    // Third loop  increments k, from k == 0 to K == broderSize - 1 ( exemple : 0 to 4)
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < boardSize + 1; j++) {
        for (let k = 0; k < boardSize; k++) {
          setlineCoordinates((prevlineCoordinates) => ({
            ...prevlineCoordinates,
            [i + "," + j + "," + k]: 0,
          }));
        }
      }
    }
    // Fill the boxes in the matrix initially with string value of rgd color => Set boxColors object
    // First loop increments i from i === 0 to i === borderSize -1 (example i: 0 to 4)
    // Secend loop incremets j from j === 0 to j === broderSize -1  (example j: 0 to 4)
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        boxColors[i + "," + j] = "rgb(120,255,255)";
      }
    }
  }, [boardSize, boxColors]);
  /**
   * Check if game finished or not
   */
  useEffect(() => {
    if (numPlayerOne + numPlayerTwo === Math.pow(boardSize, 2)) {
      const message = makeWinMessage(numPlayerOne, numPlayerTwo);
      history.push({ pathname: "/win", state: { message } });
    }
  }, [numPlayerOne, numPlayerTwo]);

  /**
   * function add a line
   * @param {*} event
   */
  const fillLine = (event) => {
    /**
     * onClick set CurrentCoodinate // 0,0,0, // 1,0,0 ....
     */
    let currentCoord = event.target.dataset.coord;
    /**
     * if lineCoordinates value of the currentCoord  equal 0
     */
    if (lineCoordinates[currentCoord] === 0) {
      /**
       * event.target.style.backgroundColor =  this.state.turn
       * Set the app state with new lineCoordinates
       * Toggle lineCoordinates value with 1 if the old one is player 1  or -1 if it was player 2
       */
      let newState = lineCoordinates;
      newState[currentCoord] = turn === "player1" ? 1 : -1;
      setlineCoordinates(newState);
      /**
       * Split the currentCoord into i, j, k variables
       */
      let splitCoord = currentCoord.split(",");
      let [i, j, k] = splitCoord;
      /**
       * set newBoxColor variable with app state boxColor
       */
      let newBoxColors = boxColors;
      /**
       * set madeSquare variable to 0
       */
      let madeSquare = 0;
      /**
       * Check the i value
       * case i === 0 ==> Horizontal  line drawed
       */
      if (i === "0") {
        /**
         * check if we made a square with the current j,k values
         * line drawed is the top border of the box
         */
        if (checkSquare(j, k, lineCoordinates, boardSize) === 4) {
          /**
           * update madeSquare value to 1
           */
          madeSquare = 1;
          /**
           *  Set the newBoxColor[j,k] with the same color of the turnColor (if turnColor === brown => make brown square)
           */
          newBoxColors[j + "," + k] =
            turn === "player1" ? "rgba(210,105,30,0.5)" : "rgba(170,7,255,0.5)";
          /**
           * Set app state with the new box color
           * upgrage numPlayerOne + 1 if the previous color was brown OR upgrade numPlayerTwo + 1 if the privious color was violet
           */
          incrementsScore(newBoxColors);
        }
        /**
         * check if we made a square with the current j-1, k values
         *  line drawed is the bottom  border of the box
         */
        if (
          checkSquare(parseFloat(j) - 1, k, lineCoordinates, boardSize) === 4
        ) {
          /**
           * update madeSquare value to 1
           */
          madeSquare = 1;
          /**
           * Set the newBoxColor[j-1, k] with the same color of the turnColor (if turnColor === red => make red square)
           */
          newBoxColors[parseFloat(j) - 1 + "," + k] =
            turn === "player1" ? "rgba(210,105,30,0.5)" : "rgba(170,7,255,0.5)";

          /**
           * Set app state with the new box color
           * upgrage numPlayerOne + 1 if the previous color was brown OR upgrade numPlayerTwo + 1 if the privious color was violet
           */
          incrementsScore(newBoxColors);
        }
      } else {
        /**
         * case i != 0 ==> Vertical line drawed
         */
        // check if we made a square with the current k,j values
        if (checkSquare(k, j, lineCoordinates, boardSize) === 4) {
          /**
           * update madeSquare value to 1
           */
          madeSquare = 1;
          /**
           * Set the newBoxColor[k, j] with the same color of the turnColor (if turnColor === player 1  => make brown square)
           */
          newBoxColors[k + "," + j] =
            turn === "player1" ? "rgba(210,105,30,0.5)" : "rgba(170,07255,0.5)";
          incrementsScore(newBoxColors);
        }
        /**
         *  check if we made a square with the current k,j-1 values
         */
        if (
          checkSquare(k, parseFloat(j) - 1, lineCoordinates, boardSize) === 4
        ) {
          /**
           * // update madeSquare value to 1
           */
          madeSquare = 1;

          /**
           * // Set the newBoxColor[k, j-1] with the same color of the turnColor (if turnColor === player 1 => make brown square)
           */
          newBoxColors[k + "," + (parseFloat(j) - 1)] =
            turn === "player1" ? "rgba(210,105,30,0.5)" : "rgba(170,07255,0.5)";
          incrementsScore(newBoxColors);
        }
      }
      // if madeSquare === 0 toggle turn color
      if (madeSquare === 0) {
        setturn(turn === "player1" ? "player2" : "player1");
      }
    }
  };
  /**
   * increment score of player and setbox color
   * @param {Object} newBoxColors
   */
  const incrementsScore = (newBoxColors) => {
    if (turn === "player1") setnumPlayerOne((prevState) => prevState + 1);
    if (turn === "player2") setnumPlayerTwo((prevState) => prevState + 1);
    setboxColors(newBoxColors);
  };

  return (
    <div id="game">
      <div id="header">
        <p id="score">Player Brown :{numPlayerOne}</p>
        <p id="score">Player Purple :{numPlayerTwo}</p>
      </div>
      <div id="board">
        {makeBoard(boardSize, fillLine, lineCoordinates, turn, boxColors)}
      </div>
    </div>
  );
};

export default Game;
