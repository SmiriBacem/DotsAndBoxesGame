import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "../css/win.css";
export const Win = () => {
  const history = useHistory();
  return (
    <div id="win" className="winText">
      <h4>
        {history?.location?.state?.message
          ? history?.location?.state?.message
          : "null"}
      </h4>
      <button
        onClick={() => {
          history.push("/");
        }}
      >
        Start a new game
      </button>
    </div>
  );
};
