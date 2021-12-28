import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import { Card, Teams } from "../../features/game/game.slice";

interface StyleProps extends Card {}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  hidden: {
    background: "linear-gradient(to top, #fffadf 30%, white 90%);",
    color: "#535353",
  },
  card: {
    height: 0,
    padding: "30%",
    position: "relative",
    cursor: "pointer",
  },
  revealed: ({ team }) => ({
    background:
      team === Teams.RED
        ? "linear-gradient(to top, #FE6B8B 30%, #FF8E53 90%)"
        : team === Teams.BLUE
        ? "linear-gradient(to top, #2196F3 30%, #21CBF3 90%)"
        : "linear-gradient(to top, #ffe599 30%, #fff4df 90%);",
    color: team ? "white" : "#535353;",
  }),
  cardContent: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1rem",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.3rem",
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: "2rem",
    },
  },
  text: ({ word }) => ({
    fontSize: word.length > 8 ? ".85em" : "1em",
  }),
}));

export default useStyles;
