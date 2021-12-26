import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Board from "../../components/board";
import socket from "../../services/socket";
import {
  assignSpymaster,
  Card,
  Player,
  revealCard,
  startGame,
  addPlayer,
} from "./game.slice";

const Game = () => {
  const dispatch = useDispatch();
  const { room } = useParams();

  useEffect(() => {
    socket.on("newUserJoined", (player) => dispatch(addPlayer(player)));
    socket.on("gameStarted", () => dispatch(startGame()));
    socket.on("revealCard", (card: Card) => dispatch(revealCard(card)));
    socket.on("assignSpymaster", (player: Player) =>
      dispatch(assignSpymaster(player))
    );

    return () => void socket.disconnect();
  }, [room]);

  return (
    <Grid container>
      <Grid item>
        <Board />
      </Grid>
    </Grid>
  );
};

export default Game;
