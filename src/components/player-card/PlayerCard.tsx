import {
  Face,
  FaceRetouchingNatural,
  FlashOff,
  SupportAgent,
} from "@mui/icons-material";
import { Avatar, Card, Typography } from "@mui/material";
import React from "react";
import { Player } from "../../features/player/player.slice";
import useStyles from "./player-card.styles";

interface Props {
  player: Player;
  isUser: boolean;
}

const PlayerCard = ({ player, isUser }: Props) => {
  const classes = useStyles({ player });

  return (
    <Card className={classes.card}>
      <Avatar className={classes.avatar}>
        {player.disconnected ? (
          <FlashOff />
        ) : player.isSpymaster ? (
          <SupportAgent />
        ) : isUser ? (
          <FaceRetouchingNatural />
        ) : (
          <Face />
        )}
      </Avatar>
      <Typography variant="h6">{player.name}</Typography>
    </Card>
  );
};

export default PlayerCard;
