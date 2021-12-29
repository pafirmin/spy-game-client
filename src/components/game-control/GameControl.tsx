import { Button, ButtonGroup, Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import socket from "../../services/socket";

const GameControl = () => {
  const { started, gameOver } = useSelector((state: RootState) => state.game);

  const handleStartGame = () => socket.emit("startGame");

  const handleResetGame = () => socket.emit("reset");

  return (
    <Grid item>
      <ButtonGroup fullWidth variant="contained">
        {!started && <Button onClick={handleStartGame}>Start Game</Button>}
        {gameOver && <Button onClick={handleResetGame}>New Game</Button>}
      </ButtonGroup>
    </Grid>
  );
};

export default GameControl;
