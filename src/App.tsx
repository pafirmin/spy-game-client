import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Game from "./features/game/Game";
import MainMenu from "./components/main-menu/MainMenu";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/:room" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
