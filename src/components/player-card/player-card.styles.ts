import { Theme } from "@emotion/react";
import { makeStyles } from "@mui/styles";
import { Teams } from "../../features/game/game.slice";

interface StyleProps {
  team: Teams;
}

const useStyles = makeStyles<Theme, StyleProps>({
  card: {
    width: "100%",
    padding: ".6rem",
    gap: "1rem",
    display: "flex",
    alignItems: "center",
    borderRadius: "45px",
  },
  avatar: ({ team }) => ({
    background: team === Teams.BLUE ? "#2196f3" : "#fe6b8b",
  }),
});

export default useStyles;
