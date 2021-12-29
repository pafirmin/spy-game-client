import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Teams } from "../../features/game/game.slice";

const ScoreBoard = () => {
  const { remainingRed, remainingBlue, activeTeam, gameOver } = useSelector(
    (state: RootState) => state.game
  );

  return (
    <Grid container item justifyContent="center">
      <Grid item>
        <Box>
          <Typography variant="h2">
            {gameOver
              ? (activeTeam === Teams.RED ? "RED TEAM" : "BLUE TEAM") + " WINS!"
              : `${remainingRed} - ${remainingBlue}`}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ScoreBoard;
