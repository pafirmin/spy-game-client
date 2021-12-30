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
      const player = state.players.find((p) => p.id === action.payload.id);

      if (player) {
        state.players = state.players.map((p) =>
          p.id === action.payload.id ? action.payload : p
        );
      } else {
        state.players.push(action.payload);
      }
    },
    removePlayer: (state, action: PayloadAction<Player>) => {
      state.players = state.players.filter((p) => p.id !== action.payload.id);
    },
    playerDisconnected: (state, action: PayloadAction<Player>) => {
      state.players = state.players.map((p) =>
        p.id === action.payload.id ? { ...p, disconnected: true } : p
      );
    },
    endTurn: (state) => {
      state.activeTeam =
        state.activeTeam === Teams.BLUE ? Teams.RED : Teams.BLUE;
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
  endTurn,
  playerDisconnected,
} = gameSlice.actions;

export default gameSlice.reducer;
