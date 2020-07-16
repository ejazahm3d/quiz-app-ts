import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { TriviaCategory } from "../../models/TriviaCategory";
import axios from "axios";

const BASE_URL = "https://opentdb.com";

export enum Difficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}
interface QuizState {
  quizCategories: TriviaCategory[];
  currentCategory: number;
  difficulty: Difficulty | string;
}

const initialState: QuizState = {
  quizCategories: [],
  currentCategory: 0,
  difficulty: Difficulty.Easy,
};

export const fetchCategories = createAsyncThunk(
  "quiz/fetchCategories",
  async () => {
    try {
      const res = await axios.get<{ trivia_categories: TriviaCategory[] }>(
        `${BASE_URL}/api_category.php`
      );

      return res.data.trivia_categories;
    } catch (error) {
      console.error(error);
    }
  }
);

export const makeQuiz = createAsyncThunk(
  "quiz/makeQuiz",
  async (data: { currentDifficulty: string; currentCategory: number }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api.php?amount=10&category=${data.currentCategory}&difficulty=${data.currentDifficulty}&type=multiple`
      );
    } catch (error) {
      console.log(error);
    }
  }
);

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    changeCategory: (state, action: PayloadAction<number>) => {
      state.currentCategory = action.payload;
    },
    changeDifficulty: (state, action: PayloadAction<Difficulty | string>) => {
      state.difficulty = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      if (action.payload) state.quizCategories = action.payload;
    });
  },
});

export const { changeCategory, changeDifficulty } = quizSlice.actions;
