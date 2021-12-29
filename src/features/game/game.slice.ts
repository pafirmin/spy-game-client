import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { switchTeams } from "../player/player.slice";
import { RootState } from "../../app/store";
import { Player } from "../player/player.slice";

export enum Teams {
  RED = "red",
  BLUE = "blue",
}

export interface Card {
  word: string;
  team: Teams;
  isRevealed: boolean;
  isAssassin: boolean;
}

export interface GameState {
  name: string;
  players: Player[];
  scores: { [Teams.RED]: number; [Teams.BLUE]: number };
  cards: Card[];
  remainingRed: number;
  remainingBlue: number;
  started: boolean;
  activeTeam: Teams | null;
  gameOver: boolean;
}

const initialState: GameState = {
  name: "",
  players: [],
  scores: {
    [Teams.RED]: 0,
    [Teams.BLUE]: 0,
  },
  cards: [],
  remainingRed: 0,
  remainingBlue: 0,
  started: false,
  gameOver: false,
  activeTeam: null,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    updateGame: (state, action: PayloadAction<GameState>) => {
      return Object.assign(state, action.payload);
    },
    assignSpymaster: (state, action: PayloadAction<Player>) => {
      state.players = state.players.map((player) =>
        player.id === action.payload.id ? action.payload : player
      );
    },
    startGame: (state) => {
      state.started = true;
    },
    addPlayer: (state, action: PayloadAction<Player>) => {
      state.players.push(action.payload);
    },
    removePlayer: (state, action: PayloadAction<string>) => {
      state.players = state.players.filter((p) => p.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(switchTeams, (state, action: PayloadAction<Player>) => {
      state.players = state.players.map((player) =>
        player.id === action.payload.id ? action.payload : player
      );
    });
  },
});

export const selectAllCards = (state: RootState) => state.game.cards;

export const {
  updateGame,
  assignSpymaster,
  startGame,
  addPlayer,
  removePlayer,
} = gameSlice.actions;

export default gameSlice.reducer;
