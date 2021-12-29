import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Game from "./features/game/Game";
import MainMenu from "./components/main-menu/";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { Container } from "@mui/material";
import Alerts from "./features/alerts/Alerts";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth={false}>
        <Alerts />
        <Router>
          <Routes>
            <Route path="/" element={<MainMenu />} />
            <Route path="/:room" element={<Game />} />
          </Routes>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
