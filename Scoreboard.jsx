import React from "react";
import "./Scoreboard.css";

const Scoreboard = ({scores, isxturn}) =>{
    const {xscore, oscore} = scores;
    return(
        <div className="scoreboard">
            <span className={`score x-score ${isxturn && "inactive"}`}>X - {xscore}</span>
            <span className={`score o-score ${isxturn && "inactive"}`}>O - {oscore}</span>
        </div>


    );
};
export default Scoreboard;