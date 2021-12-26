import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import gameReducer from "../features/game/game.slice";
import playerReducer from "../features/player/player.slice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    player: playerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
