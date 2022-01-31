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
          if (!card.isRevealed) {
            obj[card.team]++;
          }
          return obj;
        },
        { [Teams.RED]: 0, [Teams.BLUE]: 0 }
      ),
    [cards]
  );

  return (
    <Grid container item justifyContent="center">
      <Grid item>
        <Box>
          <Typography variant="h2" textAlign="center">
            {gameOver
              ? (activeTeam === Teams.RED ? "RED TEAM" : "BLUE TEAM") + " WINS!"
              : `${remainingCards[Teams.RED]} - ${remainingCards[Teams.BLUE]}`}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ScoreBoard;
