import { Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { selectAllCards } from "../../features/game/game.slice";
import Card from "../card";

const Board = () => {
  const cards = useSelector(selectAllCards);

  return (
    <Grid spacing={1} container item>
      {cards.map((card) => (
        <Grid
          item
          key={card.word}
          style={{ flexBasis: "20%", maxWidth: "20%" }}
          xs={2}
        >
          <Card card={card} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Board;
