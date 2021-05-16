import { Box } from "../components/box";
import { Col } from "../components/col";
import { Dot } from "../components/dot";
import { HorizContainer } from "../components/horizonContainer";
import { Row } from "../components/row";
import { VerticalContainer } from "../components/verticalContainer";

/**
 * Check player color
 * @param {Number} player
 * @returns
 */
export const selectColor = (player) => {
  if (player === 0) {
    return "rgb(255,255,255)";
  } else if (player === 1) {
    return "#d2691e";
  } else if (player === -1) {
    return "#aa07ff";
  }
};

/**
 * change line color with the turn color
 * @param {Object} event
 * @param {Object} lineCoordinates
 * @param {String} turn
 */
export const onHoverLine = (event, lineCoordinates, turn) => {
  let currentCoord = event.target.dataset.coord;
  if (lineCoordinates[currentCoord] === 0) {
    turn === "player1"
      ? (event.target.style.backgroundColor = "rgba(210,105,30,0.5)")
      : (event.target.style.backgroundColor = "rgba(170,7,255,0.5)");
  }
};
/**
 * remove line color
 * @param {Object} event
 * @param {Object} lineCoordinates
 */
export const onLeaveLine = (event, lineCoordinates) => {
  let currentCoord = event.target.dataset.coord;
  if (lineCoordinates[currentCoord] === 0)
    event.target.style.backgroundColor = "rgb(255,255,255)";
};

/**
 * checkSquare function
 * indicate if we can form a box with the current line selected
 * if it returns 4 that means that the diffrent border of the current box are drawed
 * else the box is not complete yet
 * @param {Number} j
 * @param {Number} k
 * @param {Object} lineCoordinates
 * @param {Number} boardSize
 * @returns
 */
export const checkSquare = (j, k, lineCoordinates, boardSize) => {
  // get the abs of lineCoordinates[0, j, k]
  let checker1 = Math.abs(lineCoordinates["0," + j + "," + k]);
  // get the abs of lineCoordinates[0, j+1, K], or 0 if j+1 > bordSize
  let checker2 = Math.abs(
    parseFloat(j) + 1 > boardSize
      ? 0
      : lineCoordinates["0," + (parseFloat(j) + 1) + "," + k]
  );
  // get the abs of lineCoordinates[1, k, j]
  let checker3 = Math.abs(lineCoordinates["1," + k + "," + j]);
  // get the abs of lineCoordinates[1, k+1, j], or 0 if k+1 > borderSize
  let checker4 = Math.abs(
    parseFloat(k) + 1 > boardSize
      ? 0
      : lineCoordinates["1," + (parseFloat(k) + 1) + "," + j]
  );
  // return the sum of the checkers
  return checker1 + checker2 + checker3 + checker4;
};

/**
 *
 * @param {Number} numPlayerOne
 * @param {Number} numPlayerTwo
 * @returns
 */
export const makeWinMessage = (numPlayerOne, numPlayerTwo) => {
  let winMessage;
  if (numPlayerOne > numPlayerTwo) {
    winMessage = "Player 1 as Brown color wins!";
  } else if (numPlayerOne < numPlayerTwo) {
    winMessage = "Player 2 as Purple color wins!";
  } else {
    winMessage = "Draw! Select a board size to start a new game.";
  }
  return winMessage;
};

/**
 *
 * @param {Number} boardSize
 * @param {Function} fillLine
 * @param {Object} lineCoordinates
 * @param {String} turn
 * @param {Object} boxColors
 * @returns
 */
export const makeBoard = (
  boardSize,
  fillLine,
  lineCoordinates,
  turn,
  boxColors
) => {
  /**
   * set cols as empty array
   */
  let cols = [];
  /**
   * loop from i === 0 to i <= boardSize * 2 (example from 0 to 10)
   */
  for (let i = 0; i <= 2 * boardSize; i++) {
    /**
     * set row as empty array
     */
    let row = [];
    /**
     * loop from j = 0 to j <= boardSize * 2 (example from 0 to 10)
     */
    for (let j = 0; j <= 2 * boardSize; j++) {
      /**
       * check i
       */
      if (i % 2 === 0) {
        /**
         * case i is an even number
         * check j
         */
        if (j % 2 === 0) {
          /**
           * case j is an even number
           * draw dot
           */
          row.push(
            <Dot
              className={"dot"}
              id={"dot" + Math.floor(i / 2) + "," + Math.floor(j / 2)}
            />
          );
        } else {
          /**
           * case j is an odd number
           * draw horizContainer
           */
          row.push(
            <HorizContainer
              className={"horizContainer"}
              dataCoord={"0," + Math.floor(i / 2) + "," + Math.floor(j / 2)}
              id={"dot" + Math.floor(i / 2) + "," + Math.floor(j / 2)}
              handleClickFilline={fillLine}
              lineCoordinates={lineCoordinates}
              indexI={i}
              indexJ={j}
              turn={turn}
            />
          );
        }
      } else {
        /**
         * case is is odd number
         * check j
         */
        if (j % 2 === 0) {
          /**
           * case j is an even number
           * draw vertContainer
           */
          row.push(
            <VerticalContainer
              className={"vertContainer"}
              dataCoord={"1," + Math.floor(j / 2) + "," + Math.floor(i / 2)}
              id={"dot" + Math.floor(i / 2) + "," + Math.floor(j / 2)}
              handleClickFilline={fillLine}
              indexI={i}
              indexJ={j}
              lineCoordinates={lineCoordinates}
              turn={turn}
            />
          );
        } else {
          /**
           * case j is an odd number
           * draw a box
           */
          row.push(
            <Box
              className={"box"}
              id={"box" + Math.floor(i / 2) + "," + Math.floor(j / 2)}
              style={{
                backgroundColor:
                  boxColors[Math.floor(i / 2) + "," + Math.floor(j / 2)],
              }}
            />
          );
        }
      }
    }
    cols.push(<Row row={row} />);
  }
  return <Col cols={cols} />;
};
