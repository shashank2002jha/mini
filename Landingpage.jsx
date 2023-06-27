import React from "react";
import "./Landpage.css";

const Landingpage = ({ onPlayClick }) => {
    return (
      <div className="landing-page">
        <h1>Tic Tac Toe</h1>
        <button onClick={onPlayClick}>Play</button>
      </div>
    );
  };

  export default Landingpage;
  