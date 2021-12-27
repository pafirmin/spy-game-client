import { Theme } from "@emotion/react";
import { QuestionMark } from "@mui/icons-material";
import { Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Card as ICard, Teams } from "../../features/game/game.slice";
import socket from "../../services/socket";

interface Props {
  card: ICard;
}

interface StyleProps {
  team: Teams;
}

const useStyles = makeStyles<Theme, StyleProps>({
  hidden: {
    background: "linear-gradient(to top, #fffadf 30%, white 90%);",
    color: "#535353",
  },
  card: {
    height: 0,
    padding: "30%",
    position: "relative",
    cursor: "pointer",
  },
  revealed: ({ team }) => ({
    background:
      team === Teams.RED
        ? "linear-gradient(to top, #FE6B8B 30%, #FF8E53 90%)"
        : team === Teams.BLUE
        ? "linear-gradient(to top, #2196F3 30%, #21CBF3 90%)"
        : "linear-gradient(to top, #ffe599 30%, #fff4df 90%);",
    color: team ? "white" : "#535353;",
  }),
  cardContent: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const Card = ({ card }: Props) => {
  console.log(card);
  const classes = useStyles({ team: card.team });

  const handleReveal = () => {
    socket.emit("reveal", card);
  };

  return (
    <Paper
      className={
        classes.card +
        " " +
        (card.isRevealed ? classes.revealed : classes.hidden)
      }
    >
      <Grid container justifyContent="center" alignItems="center">
        <Grid item className={classes.cardContent} onClick={handleReveal}>
          <Typography variant="h5" color="inherit">
            {card.word}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Card;
