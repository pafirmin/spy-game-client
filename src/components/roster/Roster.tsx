import {
  Button,
  ButtonGroup,
  Drawer,
  Grid,
  List,
  ListItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { LayoutGroup, motion } from "framer-motion";
import React, { useMemo } from "react";
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
  const theme = useTheme();
  const breakpoint = useMediaQuery(theme.breakpoints.up("lg"));
  const classes = useStyles({ team });
  const { players, started, activeTeam } = useSelector(
    (state: RootState) => state.game
  );
  const localPlayer = useSelector((state: RootState) => state.player);
  const { openDrawers } = useSelector((state: RootState) => state.layout);
  const spyMasterAssigned = useMemo(
    () => players.some((player) => player.isSpymaster && player.team === team),
    [players]
  );
  const teamPlayers = useMemo(
    () =>
      players
        .filter((player) => player.team === team)
        .sort((player) => (player.isSpymaster ? -1 : 1)),
    [players]
  );

  const handleSpymaster = () => {
    socket.emit("assignSpymaster");
  };

  const handleSwitchTeams = () => {
    socket.emit("switchTeam");
  };

  const drawerContent = (
    <Grid
      container
      direction="column"
      alignItems="stretch"
      justifyContent="space-between"
      style={{ height: "100%", padding: ".4rem" }}
    >
      <Grid item>
        <LayoutGroup>
          <List component={motion.ul} layout className={classes.list}>
            {teamPlayers.map((player) => (
              <ListItem layout component={motion.li} key={player.id}>
                <PlayerCard
                  player={player}
                  isUser={localPlayer.name === player.name}
                />
              </ListItem>
            ))}
          </List>
        </LayoutGroup>
      </Grid>
      {localPlayer.team === team && (
        <Grid item>
          <ButtonGroup fullWidth variant="contained" orientation="vertical">
            {!spyMasterAssigned && (
              <Button onClick={handleSpymaster}>Spymaster</Button>
            )}
            {!started && (
              <Button onClick={handleSwitchTeams}>Switch team</Button>
            )}
          </ButtonGroup>
        </Grid>
      )}
    </Grid>
  );

  return breakpoint ? (
    <Drawer
      variant="permanent"
      anchor={team === Teams.RED ? "left" : "right"}
      className={classes.drawer}
      classes={{
        paper: `${classes.paper} ${
          started && team !== activeTeam && classes.inactive
        }`,
      }}
    >
      {drawerContent}
    </Drawer>
  ) : (
    <Drawer
      variant="temporary"
      open={openDrawers}
      anchor={team === Teams.RED ? "left" : "right"}
      className={classes.drawer}
      classes={{
        paper: `${classes.paper} ${
          started && team !== activeTeam && classes.inactive
        }`,
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Roster;
