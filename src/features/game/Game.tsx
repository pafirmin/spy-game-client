import { Grid, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../app/store";
import Board from "../../components/board";
import GameControl from "../../components/game-control";
import MenuButton from "../../components/menu-button";
import Roster from "../../components/roster";
import ScoreBoard from "../../components/scoreboard";
import socket from "../../services/socket";
import { Player, switchTeams, updatePlayer } from "../player/player.slice";
import {
  Teams,
  assignSpymaster,
  startGame,
  addPlayer,
  GameState,
  updateGame,
  removePlayer,
  endTurn,
  playerDisconnected,
} from "./game.slice";

const Game = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch = useDispatch();
  const player = useSelector((state: RootState) => state.player);
  const { room } = useParams();

  const onGameJoined = (game: GameState, player: Player) => {
    localStorage.setItem("id", player.id);
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
  const onPlayerLeft = (player: Player) => dispatch(removePlayer(player));
  const onSpymasterAsssigned = (player: Player) =>
    dispatch(assignSpymaster(player));
  const onTurnEnded = () => dispatch(endTurn());
  const onReconnect = () => socket.emit("rejoin", player, room);
  const onPlayerDisconnect = (player: Player) =>
    dispatch(playerDisconnected(player));

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
    socket.on("turnEnded", onTurnEnded);
    socket.on("playerDisconnected", onPlayerDisconnect);
    socket.on("reconnect", onReconnect);

    return () => {
      dispatch(updatePlayer({ isSpymaster: false }));
      socket.emit("leaveGame", player);
      socket.off("gameJoined", onGameJoined);
      socket.off("newGame", onGameReset);
      socket.off("newUserJoined", onNewUserJoined);
      socket.off("gameStarted", onGameStarted);
      socket.off("spymasterAssigned", onSpymasterAsssigned);
      socket.off("teamSwitched", onTeamSwitched);
      socket.off("playerLeft", onPlayerLeft);
      socket.off("updateGame", onGameUpdated);
      socket.off("turnEnded", onTurnEnded);
      socket.off("playerDisconnected", onPlayerDisconnect);
      socket.off("reconnect", onReconnect);
    };
  }, []);

  return (
    <Grid container justifyContent="center" wrap="nowrap">
      <Grid xs={0} lg={2} item>
        <Roster team={Teams.RED} />
      </Grid>
      <Grid
        container
        item
        wrap="nowrap"
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
      {isSmallScreen && <MenuButton />}
    </Grid>
  );
};

export default Game;
