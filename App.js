import React,{useState} from "react";
import Board from "./Board";
import "./App.css";
import Landingpage from "./Landingpage";


const App = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const handlePlayClick = () => {
    setGameStarted(true);
  };

  return gameStarted ? <Board /> : <Landingpage onPlayClick={handlePlayClick} />;
};

export default App;
