import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserAnswer {
  question: string;
  answer: string;
  isCorrect: boolean;
  correctAnswer: string;
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
    setGame: (state, action: PayloadAction<boolean>) => {
      state.started = action.payload;
    },
    addAnswer: (state, action: PayloadAction<UserAnswer>) => {
      if (action.payload.isCorrect) {
        state.score = state.score + 1;
      }
      state.userAnswers.push(action.payload);
    },
    resetAnswers: (state) => {
      state.userAnswers = [];
    },
  },
});

export const {
  changeStep,
  setGame,
  addAnswer,
  resetAnswers,
} = gameSlice.actions;
