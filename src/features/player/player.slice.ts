import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Teams, assignSpymaster } from "../game/game.slice";

export interface Player {
  id: string;
  name: string;
  room: string;
  team: Teams | null;
  isSpymaster: boolean;
}

const initialState: Player = {
  id: "",
  name: "",
  room: "",
  team: null,
  isSpymaster: false,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    updatePlayer: (state, action: PayloadAction<Partial<Player>>) => {
      return Object.assign(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(assignSpymaster, (state, action: PayloadAction<Player>) => {
      if (state.name === action.payload.name) {
        return Object.assign(state, action.payload);
      }
    });
  },
});

export const { updatePlayer } = playerSlice.actions;

export default playerSlice.reducer;
