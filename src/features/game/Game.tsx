import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Board from "../../components/board";
import Roster from "../../components/roster/Roster";
import ScoreBoard from "../../components/scoreboard/ScoreBoard";
import socket from "../../services/socket";
import {
  assignSpymaster,
  Card,
  Player,
  revealCard,
  startGame,
  addPlayer,
  Teams,
  updateGame,
  GameState,
  removePlayer,
} from "./game.slice";

const Game = () => {
  const dispatch = useDispatch();
  const player = useSelector((state: RootState) => state.player);

  const onGameJoined = (game: GameState) => dispatch(updateGame(game));
  const onNewUserJoined = (player: Player) => dispatch(addPlayer(player));
  const onGameStarted = () => dispatch(startGame());
  const onCardRevealed = (card: Card) => dispatch(revealCard(card));
  const onPlayerLeft = (player: Player) => dispatch(removePlayer(player));
  const onSpymasterAsssigned = (player: Player) =>
    dispatch(assignSpymaster(player));

  useEffect(() => {
    socket.emit("join", player);
    socket.on("gameJoined", onGameJoined);
    socket.on("playerLeft", onPlayerLeft);
    socket.on("newUserJoined", onNewUserJoined);
    socket.on("gameStarted", onGameStarted);
    socket.on("revealCard", onCardRevealed);
    socket.on("assignSpymaster", onSpymasterAsssigned);

    return () => {
      socket.emit("leaveGame", player);
      socket.off("gameJoined", onGameJoined);
      socket.off("newUserJoined", onNewUserJoined);
      socket.off("gameStarted", onGameStarted);
      socket.off("revealCard", onCardRevealed);
      socket.off("assignSpymaster", onSpymasterAsssigned);
      socket.off("playerLeft", onPlayerLeft);
    };
  }, []);

  return (
    <Grid
      container
      xs={12}
      spacing={2}
      justifyContent="space-between"
      wrap="nowrap"
    >
      <Grid xs={2} item>
        <Roster team={Teams.RED} />
      </Grid>
      <Grid container item xs={8} direction="column" alignItems="stretch">
        <Grid item>
          <ScoreBoard />
        </Grid>
        <Grid item>
          <Board />
        </Grid>
      </Grid>
      <Grid xs={2} item>
        <Roster team={Teams.BLUE} />
      </Grid>
    </Grid>
  );
};

export default Game;
