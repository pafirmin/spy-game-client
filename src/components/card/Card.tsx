import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { Card as ICard } from "../../features/game/game.slice";

interface Props {
  card: ICard;
}

const Card = ({ card }: Props) => {
  return (
    <Paper style={{ height: 0, paddingBottom: "50%" }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item>
          <Typography>{card.word}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Card;
