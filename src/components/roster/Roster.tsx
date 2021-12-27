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
  console.log(players);

  return (
    <Drawer
      style={{ width: "100%" }}
      variant="permanent"
      anchor={team === Teams.RED ? "left" : "right"}
      PaperProps={{ style: { width: "15%" } }}
    >
      <List>
        {players
          .filter((player) => player.team === team)
          .map((player) => (
            <ListItem>{player.name}</ListItem>
          ))}
      </List>
    </Drawer>
  );
};

export default Roster;
