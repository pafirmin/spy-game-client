import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import { Teams } from "../../features/game/game.slice";

interface StyleProps {
  team: Teams;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  paper: ({ team }) => ({
    width: "0%",
    maxWidth: "300px",
    [theme.breakpoints.up("lg")]: {
      width: "25%",
    },
    background:
      team === Teams.RED
        ? "linear-gradient(to  bottom, #FE6B8B 30%, #FF8E53 90%)"
        : "linear-gradient(to  bottom, #2196F3 30%, #21CBF3 90%)",
  }),
  list: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default useStyles;
