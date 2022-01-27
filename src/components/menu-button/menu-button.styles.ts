import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

const useStyles = makeStyles<Theme>((theme) => ({
  button: {
    outline: "none",
    border: "none",
    cursor: "pointer",
    position: "absolute",
    bottom: "18px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "white",
    boxShadow: theme.shadows[1],
    zIndex: 1000000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default useStyles;
