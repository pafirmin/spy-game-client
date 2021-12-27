import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Game from "./features/game/Game";
import MainMenu from "./components/main-menu/MainMenu";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/:room" element={<Game />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
