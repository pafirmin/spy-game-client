import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
});

export const { showInfo, showError, showWarning, shiftAlert } =
  alertsSlice.actions;

export default alertsSlice.reducer;
