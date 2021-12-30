import { Button, ButtonGroup, Grid } from "@mui/material";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import socket from "../../services/socket";

const GameControl = () => {
  const team = useSelector((state: RootState) => state.player.team);
  const { started, gameOver, activeTeam } = useSelector(
    (state: RootState) => state.game
  );
  const canEndTurn = useMemo(
    () => started && !gameOver && activeTeam === team,
    [started, team, activeTeam]
  );

  const handleStartGame = () => socket.emit("startGame");

  const handleResetGame = () => socket.emit("reset");

  const handleEndTurn = () => socket.emit("endTurn");

  return (
    <Grid item>
      <ButtonGroup fullWidth variant="contained">
        {canEndTurn && <Button onClick={handleEndTurn}>End Turn</Button>}
        {!started && <Button onClick={handleStartGame}>Start Game</Button>}
        {gameOver && <Button onClick={handleResetGame}>New Game</Button>}
      </ButtonGroup>
    </Grid>
  );
};

export default GameControl;
