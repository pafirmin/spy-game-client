import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../app/store";
import socket from "../../services/socket";
import { updatePlayer } from "../player/player.slice";
import {
  assignSpymaster,
  Card,
  Player,
  revealCard,
  startGame,
} from "./game.slice";

const Game = () => {
  const dispatch = useDispatch();
  const player = useSelector((state: RootState) => state.player);
  const { room } = useParams();

  useEffect(() => {
    socket.emit("join", { ...player, room });
    socket.on("gameJoined", ({ room }) => dispatch(updatePlayer({ room })));
    socket.on("gameStarted", () => dispatch(startGame()));
    socket.on("revealCard", (card: Card) => dispatch(revealCard(card)));
    socket.on("assignSpymaster", (player: Player) =>
      dispatch(assignSpymaster(player))
    );

    return () => void socket.disconnect();
  }, []);

  return <div></div>;
};

export default Game;
