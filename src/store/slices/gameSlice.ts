import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserAnswer {
  question: string;
  answer: string;
  isCorrect: boolean;
  correctAnswer: boolean;
}
export interface GameState {
  started: boolean;
  step: number;
  score: number;
  userAnswers: UserAnswer[];
}

const initialState: GameState = {
  started: false,
  step: 0,
  score: 0,
  userAnswers: [],
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    changeStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    setGame: (state, action: PayloadAction<boolean>) => {},
    addAnswer: (state, action: PayloadAction<boolean>) => {},
    resetAnswers: (state, action: PayloadAction<boolean>) => {},
  },
});

export const { changeStep, setGame } = gameSlice.actions;
