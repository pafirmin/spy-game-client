import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const ScoreBoard = () => {
  const { remainingBlue, remainingRed } = useSelector(
    (state: RootState) => state.game
  );

  return (
    <Box>
      <Grid container justifyContent="center">
        <Grid item>
          <Typography variant="h2">
            {remainingRed} - {remainingBlue}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ScoreBoard;
