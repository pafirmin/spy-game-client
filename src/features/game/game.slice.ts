import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  blueScore: number;
  redScore: number;
  cards: Card[];
  remainingRed: number;
  remainingBlue: number;
  started: boolean;
  gameOver: boolean;
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
  gameOver: false,
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
    revealCard: (state, action: PayloadAction<Card>) => {
      state.cards = state.cards.map((card) =>
        card.word === action.payload.word ? { ...card, isRevealed: true } : card
      );
    },
    addPlayer: (state, action: PayloadAction<Player>) => {
      state.players.push(action.payload);
    },
    removePlayer: (state, action: PayloadAction<string>) => {
      state.players = state.players.filter((p) => p.id !== action.payload);
    },
    gameOver: (state) => {
      state.gameOver = true;
    },
  },
});

export const selectAllCards = (state: RootState) => state.game.cards;

export const {
  updateGame,
  assignSpymaster,
  startGame,
  revealCard,
  addPlayer,
  removePlayer,
  gameOver,
} = gameSlice.actions;

export default gameSlice.reducer;
