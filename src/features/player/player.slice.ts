import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Teams, assignSpymaster } from "../game/game.slice";

export interface Player {
  id: string;
  name: string;
  team: Teams | null;
  isSpymaster: boolean;
  disconnected: boolean;
}

const initialState: Player = {
  id: localStorage.getItem("id") || "",
  name: "",
  team: null,
  isSpymaster: false,
  disconnected: false,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    updatePlayer: (state, action: PayloadAction<Partial<Player>>) => {
      return Object.assign(state, action.payload);
    },
    switchTeams: (state, action: PayloadAction<Player>) => {
      if (state.id === action.payload.id) {
        return Object.assign(state, action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(assignSpymaster, (state, action: PayloadAction<Player>) => {
      if (state.id === action.payload.id) {
        return Object.assign(state, action.payload);
      }
    });
  },
});

export const { updatePlayer, switchTeams } = playerSlice.actions;

export default playerSlice.reducer;
