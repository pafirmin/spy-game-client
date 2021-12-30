import { QuestionMark, Visibility } from "@mui/icons-material";
import { Grid, Paper, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { showWarning } from "../../features/alerts/alerts.slice";
import { Card as ICard } from "../../features/game/game.slice";
import socket from "../../services/socket";
import useStyles from "./card.styles";

interface Props {
  card: ICard;
}

const Card = ({ card }: Props) => {
  const classes = useStyles(card);
  const dispatch = useDispatch();
  const player = useSelector((state: RootState) => state.player);
  const { gameOver, started, activeTeam } = useSelector(
    (state: RootState) => state.game
  );
  const shouldReveal = useMemo(
    () => card.isRevealed || player.isSpymaster || gameOver,
    [player, card]
  );

  const handleReveal = () => {
    if (!started) {
      dispatch(showWarning("The game hasn't started yet!"));
      return;
    } else if (player.team !== activeTeam) {
      dispatch(showWarning("Wait your turn!"));
      return;
    }
    socket.emit("reveal", card);
  };

  return (
    <Paper
      className={
        classes.card + " " + (shouldReveal ? classes.revealed : classes.hidden)
      }
    >
      {card.isRevealed && <Visibility className={classes.visibility} />}
      <Grid container justifyContent="center" alignItems="center">
        <Grid item className={classes.cardContent} onClick={handleReveal}>
          <Typography className={classes.text} variant="h5" color="inherit">
            {started ? card.word : <QuestionMark fontSize="large" />}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Card;
