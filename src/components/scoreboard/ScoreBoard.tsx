import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Teams } from "../../features/game/game.slice";

const ScoreBoard = () => {
  const scores = useSelector((state: RootState) => state.game.scores);

  return (
    <Box>
      <Grid container justifyContent="center">
        <Grid item>
          <Typography variant="h2">
            {scores[Teams.RED]} - {scores[Teams.BLUE]}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ScoreBoard;
