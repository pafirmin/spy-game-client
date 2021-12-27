import { Theme } from "@emotion/react";
import { Face, FaceRetouchingNatural, SupportAgent } from "@mui/icons-material";
import { Avatar, Card, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Player, Teams } from "../../features/game/game.slice";

interface Props {
  player: Player;
  isUser: boolean;
}

interface StyleProps {
  team: Teams;
}

const useStyles = makeStyles<Theme, StyleProps>({
  card: {
    width: "100%",
    padding: ".8rem",
    gap: "1rem",
    display: "flex",
    alignItems: "center",
    borderRadius: "45px",
  },
  avatar: ({ team }) => ({
    background: team === Teams.BLUE ? "#2196f3" : "#fe6b8b",
  }),
});

const PlayerCard = ({ player, isUser }: Props) => {
  const classes = useStyles({ team: player.team as Teams });

  return (
    <Card className={classes.card}>
      <Avatar className={classes.avatar}>
        {player.isSpymaster ? (
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
