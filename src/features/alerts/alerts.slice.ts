import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addPlayer,
  assignSpymaster,
  playerDisconnected,
  removePlayer,
} from "../game/game.slice";
import { Player } from "../player/player.slice";

export enum AlertTypes {
  INFO = "info",
  WARNING = "warning",
  ERROR = "error",
}

export interface Alert {
  type: AlertTypes;
  message: string;
}

const initialState: Alert[] = [];

export const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    showInfo: (state, action: PayloadAction<string>) => {
      state.push({ type: AlertTypes.INFO, message: action.payload });
    },
    showWarning: (state, action: PayloadAction<string>) => {
      state.push({ type: AlertTypes.WARNING, message: action.payload });
    },
    showError: (state, action: PayloadAction<string>) => {
      state.push({ type: AlertTypes.ERROR, message: action.payload });
    },
    shiftAlert: (state) => {
      return state.slice(1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(assignSpymaster, (state, action: PayloadAction<Player>) => {
        const { name, team } = action.payload;
        state.push({
          type: AlertTypes.INFO,
          message: `${name} is ${team} spymaster!`,
        });
      })
      .addCase(addPlayer, (state, action: PayloadAction<Player>) => {
        const { name } = action.payload;
        state.push({
          type: AlertTypes.INFO,
          message: `${name} joined the game!`,
        });
      })
      .addCase(removePlayer, (state, action: PayloadAction<Player>) => {
        const { name } = action.payload;
        state.push({
          type: AlertTypes.WARNING,
          message: `${name} left the game!`,
        });
      })
      .addCase(playerDisconnected, (state, action: PayloadAction<Player>) => {
        const { name } = action.payload;
        state.push({
          type: AlertTypes.WARNING,
          message: `${name} disconnected!`,
        });
      });
  },
});

export const { showInfo, showError, showWarning, shiftAlert } =
  alertsSlice.actions;

export default alertsSlice.reducer;
