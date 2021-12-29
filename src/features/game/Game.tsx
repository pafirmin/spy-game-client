import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../app/store";
import Board from "../../components/board";
import GameControl from "../../components/game-control";
import Roster from "../../components/roster";
import ScoreBoard from "../../components/scoreboard";
import socket from "../../services/socket";
import { Player, switchTeams, updatePlayer } from "../player/player.slice";
import {
  assignSpymaster,
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
  const { room } = useParams();

  const onGameJoined = (game: GameState, player: Player) => {
    dispatch(updateGame(game));
    dispatch(updatePlayer(player));
  };
  const onGameReset = (game: GameState) => {
    dispatch(updateGame(game));
    dispatch(updatePlayer({ isSpymaster: false }));
  };
  const onGameUpdated = (game: GameState) => dispatch(updateGame(game));
  const onNewUserJoined = (player: Player) => dispatch(addPlayer(player));
  const onGameStarted = () => dispatch(startGame());
  const onTeamSwitched = (player: Player) => dispatch(switchTeams(player));
  const onPlayerLeft = (name: string) => dispatch(removePlayer(name));
  const onSpymasterAsssigned = (player: Player) =>
    dispatch(assignSpymaster(player));

  useEffect(() => {
    socket.emit("join", player, room);
    socket.on("updateGame", onGameUpdated);
    socket.on("newGame", onGameReset);
    socket.on("gameJoined", onGameJoined);
    socket.on("playerLeft", onPlayerLeft);
    socket.on("newUserJoined", onNewUserJoined);
    socket.on("teamSwitched", onTeamSwitched);
    socket.on("gameStarted", onGameStarted);
    socket.on("spymasterAssigned", onSpymasterAsssigned);

    return () => {
      socket.emit("leaveGame", player);
      socket.off("gameJoined", onGameJoined);
      socket.off("newGame", onGameReset);
      socket.off("newUserJoined", onNewUserJoined);
      socket.off("gameStarted", onGameStarted);
      socket.off("spymasterAssigned", onSpymasterAsssigned);
      socket.off("teamSwitched", onTeamSwitched);
      socket.off("playerLeft", onPlayerLeft);
      socket.off("updateGame", onGameUpdated);
    };
  }, []);

  return (
    <Grid container xs={12} justifyContent="center" wrap="nowrap">
      <Grid xs={0} lg={2} item>
        <Roster team={Teams.RED} />
      </Grid>
      <Grid
        container
        item
        xs={12}
        lg={6}
        gap={3}
        direction="column"
        justifyContent="flex-start"
        style={{ maxWidth: "1200px", height: "100vh" }}
      >
        <ScoreBoard />
        <Board />
        <GameControl />
      </Grid>
      <Grid xs={0} lg={2} item>
        <Roster team={Teams.BLUE} />
      </Grid>
    </Grid>
  );
};

export default Game;
