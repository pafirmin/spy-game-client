import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Game from "./features/game/Game";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:room" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
