import { Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { selectAllCards } from "../../features/game/game.slice";
import Card from "../card";

const Board = () => {
  const cards = useSelector(selectAllCards);

  return (
    <Grid container spacing={2}>
      {cards.map((card) => (
        <Grid item>
          <Card card={card} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Board;
