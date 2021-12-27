import { Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { selectAllCards } from "../../features/game/game.slice";
import Card from "../card";

const Board = () => {
  const cards = useSelector(selectAllCards);

  return (
    <Grid spacing={4} container>
      {cards.map((card) => (
        <Grid style={{ flexBasis: "20%", maxWidth: "20%" }} xs={2} item>
          <Card card={card} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Board;
