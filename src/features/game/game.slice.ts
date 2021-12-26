import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export enum Teams {
  RED = "red",
  BLUE = "blue",
}

export interface Player {
  name: string;
  room: string;
  team: Teams | null;
  isSpymaster: boolean;
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
  blueScore: number;
  redScore: number;
  cards: Card[];
  remainingRed: number;
  remainingBlue: number;
  started: boolean;
}

const initialState: GameState = {
  name: "",
  players: [],
  blueScore: 0,
  redScore: 0,
  cards: [],
  remainingRed: 0,
  remainingBlue: 0,
  started: false,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    updateGame: (state, action: PayloadAction<Partial<GameState>>) => {
      return Object.assign(state, action.payload);
    },
    assignSpymaster: (state, action: PayloadAction<Player>) => {
      state.players = state.players.map((player) =>
        player.name === action.payload.name
          ? { ...player, isAssassin: true }
          : player
      );
    },
    startGame: (state) => {
      state.started = true;
    },
    revealCard: (state, action: PayloadAction<Card>) => {
      state.cards = state.cards.map((card) =>
        card.word === action.payload.word ? { ...card, isRevealed: true } : card
      );
    },
    addPlayer: (state, action: PayloadAction<Player>) => {
      state.players.push(action.payload);
    },
  },
});

export const selectAllCards = (state: RootState) => state.game.cards;

export const { updateGame, assignSpymaster, startGame, revealCard, addPlayer } =
  gameSlice.actions;

export default gameSlice.reducer;
