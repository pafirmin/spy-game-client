import { createSlice } from "@reduxjs/toolkit";

export interface LayoutState {
  openDrawers: boolean;
}

const initialState: LayoutState = {
  openDrawers: false,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleDrawers: (state) => {
      state.openDrawers = !state.openDrawers;
    },
  },
});

export const { toggleDrawers } = layoutSlice.actions;

export default layoutSlice.reducer;
