import { Box, Grid, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Teams } from "../../features/game/game.slice";

const ScoreBoard = () => {
  const { cards, activeTeam, gameOver } = useSelector(
    (state: RootState) => state.game
  );
  const remainingCards = useMemo(
    () =>
      cards.reduce(
        (obj, card) => {
          if (card.team === Teams.RED) {
            obj.red++;
          } else if (card.team === Teams.BLUE) {
            obj.blue++;
          }
          return obj;
        },
        { red: 0, blue: 0 }
      ),
    [cards]
  );

  return (
    <Grid container item justifyContent="center">
      <Grid item>
        <Box>
          <Typography variant="h2">
            {gameOver
              ? (activeTeam === Teams.RED ? "RED TEAM" : "BLUE TEAM") + " WINS!"
              : `${remainingCards.red} - ${remainingCards.blue}`}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ScoreBoard;
