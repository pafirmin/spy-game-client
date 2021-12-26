import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "../game/game.slice";

const initialState: Player = {
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
  extraReducers: {
    assignSpymaster: (state, action: PayloadAction<Player>) => {
      if (state.name === action.payload.name) {
        return { ...state, isSpymaster: true };
      }
    },
  },
});

export const { updatePlayer } = playerSlice.actions;

export default playerSlice.reducer;
