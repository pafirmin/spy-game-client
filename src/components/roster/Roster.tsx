import { Drawer, List, ListItem, Paper } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Teams } from "../../features/game/game.slice";

interface Props {
  team: Teams;
}

const Roster = ({ team }: Props) => {
  const players = useSelector((state: RootState) => state.game.players);

  return (
    <Paper>
      <List>
        {players
          .filter((player) => player.team === team)
          .map((player) => (
            <ListItem>{player.name}</ListItem>
          ))}
      </List>
    </Paper>
  );
};

export default Roster;
