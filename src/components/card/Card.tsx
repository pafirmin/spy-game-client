import { Grid, Paper, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Card as ICard } from "../../features/game/game.slice";
import socket from "../../services/socket";
import useStyles from "./card.styles";

interface Props {
  card: ICard;
}

const Card = ({ card }: Props) => {
  const classes = useStyles(card);
  const player = useSelector((state: RootState) => state.player);
  const shouldReveal = useMemo(
    () => card.isRevealed || player.isSpymaster,
    [player, card]
  );

  const handleReveal = () => {
    socket.emit("reveal", card);
  };

  return (
    <Paper
      className={
        classes.card + " " + (shouldReveal ? classes.revealed : classes.hidden)
      }
    >
      <Grid container justifyContent="center" alignItems="center">
        <Grid item className={classes.cardContent} onClick={handleReveal}>
          <Typography className={classes.text} variant="h5" color="inherit">
            {card.word}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Card;
