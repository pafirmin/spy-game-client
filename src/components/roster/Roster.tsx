import {
  Button,
  ButtonGroup,
  Drawer,
  Grid,
  List,
  ListItem,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Teams } from "../../features/game/game.slice";
import socket from "../../services/socket";
import PlayerCard from "../player-card/";
import useStyles from "./roster.styles";

interface Props {
  team: Teams;
}

const Roster = ({ team }: Props) => {
  const classes = useStyles({ team });
  const { players, started } = useSelector((state: RootState) => state.game);
  const localPlayer = useSelector((state: RootState) => state.player);

  const handleSpymaster = () => {
    socket.emit("assignSpymaster");
  };

  const handleSwitchTeams = () => {
    socket.emit("switchTeam");
  };

  return (
    <Drawer
      variant="permanent"
      anchor={team === Teams.RED ? "left" : "right"}
      className={classes.drawer}
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
                <ListItem key={player.name}>
                  <PlayerCard
                    player={player}
                    isUser={localPlayer.name === player.name}
                  />
                </ListItem>
              ))}
          </List>
        </Grid>
        <Grid item>
          <ButtonGroup fullWidth variant="contained" orientation="vertical">
            <Button onClick={handleSpymaster}>Spymaster</Button>
            {!started && (
              <Button onClick={handleSwitchTeams}>Switch team</Button>
            )}
          </ButtonGroup>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default Roster;
