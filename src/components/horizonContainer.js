import React from "react";
import { selectColor, onHoverLine, onLeaveLine } from "../helper/functions";

export const HorizContainer = (props) => {
  return (
    <div
      className={props.className}
      id={props.id}
      data-coord={props.dataCoord}
      onClick={(e) => props.handleClickFilline(e)}
      onMouseEnter={(e) => onHoverLine(e, props.lineCoordinates, props.turn)}
      onMouseLeave={(e) => onLeaveLine(e, props.lineCoordinates)}
      style={{
        backgroundColor: selectColor(
          props.lineCoordinates[
            "0," +
              Math.floor(props.indexI / 2) +
              "," +
              Math.floor(props.indexJ / 2)
          ]
        ),
      }}
    >
      {" "}
    </div>
  );
};
