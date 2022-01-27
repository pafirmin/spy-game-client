import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import { Teams } from "../../features/game/game.slice";

interface StyleProps {
  team: Teams;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  paper: ({ team }) => ({
    maxWidth: "300px",
    width: "48%",
    background:
      team === Teams.RED
        ? `linear-gradient(to bottom, #FE6B8B 30%, #FF8E53 90%)`
        : `linear-gradient(to bottom, #2196F3 30%, #21CBF3 90%)`,
  }),
  list: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  inactive: ({ team }) => ({
    background:
      team === Teams.RED
        ? "linear-gradient(rgb(102, 45, 57) 30%, rgb(89, 51, 31) 90%) repeat scroll 0% 0%"
        : "linear-gradient(rgb(14, 48, 74) 30%, rgb(17, 84, 100) 90%) repeat scroll 0% 0%",
  }),
}));

export default useStyles;
