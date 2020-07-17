import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GameState {
  started: boolean;
  step: number;
}

const initialState: GameState = {
  started: false,
  step: 0,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    changeStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    setGame: (state, action: PayloadAction<boolean>) => {},
  },
});

export const { changeStep, setGame } = gameSlice.actions;
