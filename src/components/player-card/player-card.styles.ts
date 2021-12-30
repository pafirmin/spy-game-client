import { Theme } from "@emotion/react";
import { makeStyles } from "@mui/styles";
import { Teams } from "../../features/game/game.slice";
import { Player } from "../../features/player/player.slice";

interface StyleProps {
  player: Player;
}

const useStyles = makeStyles<Theme, StyleProps>({
  card: {
    width: "100%",
    padding: ".6rem",
    gap: "1rem",
    display: "flex",
    alignItems: "center",
    borderRadius: "45px",
    background: ({ player }) => (player.disconnected ? "#c3c3c3" : "#fff"),
  },
  avatar: ({ player }) => ({
    background: player.team === Teams.BLUE ? "#2196f3" : "#fe6b8b",
  }),
});

export default useStyles;
