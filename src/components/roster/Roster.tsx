import { Theme } from "@emotion/react";
import { Button, Drawer, Grid, List, ListItem, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Teams } from "../../features/game/game.slice";
import socket from "../../services/socket";
import PlayerCard from "../player-card/";

interface Props {
  team: Teams;
}

interface StyleProps {
  team: Teams;
}

const useStyles = makeStyles<Theme, StyleProps>({
  paper: ({ team }) => ({
    width: "15%",
    maxWidth: "300px",
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
});

const Roster = ({ team }: Props) => {
  const classes = useStyles({ team });
  const players = useSelector((state: RootState) => state.game.players);
  const localPlayer = useSelector((state: RootState) => state.player);

  const handleSpymaster = () => {
    socket.emit("assignSpymaster", localPlayer);
  };

  return (
    <Drawer
      variant="permanent"
      style={{ background: "red" }}
      anchor={team === Teams.RED ? "left" : "right"}
      classes={{ paper: classes.paper }}
    >
      <Grid
        container
        direction="column"
        alignItems="stretch"
        justifyContent="space-between"
        style={{ height: "100%", padding: ".4rem" }}
      >
        <Grid item>
          <List className={classes.list}>
            {players
              .filter((player) => player.team === team)
              .sort((player) => (player.isSpymaster ? -1 : 1))
              .map((player) => (
                <ListItem>
                  <PlayerCard
                    player={player}
                    isUser={localPlayer.name === player.name}
                  />
                </ListItem>
              ))}
          </List>
        </Grid>
        <Grid item>
          <Button
            onClick={handleSpymaster}
            style={{ width: "100%" }}
            variant="contained"
          >
            Spymaster
          </Button>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default Roster;
