import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { TriviaCategory } from "../../models/TriviaCategory";
import axios from "axios";

const BASE_URL = "https://opentdb.com/";

interface QuizState {
  quizCategories: TriviaCategory[];
  currentCategory: number;
}

const initialState: QuizState = {
  quizCategories: [],
  currentCategory: 0,
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

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    changeCategory: (state, action: PayloadAction<number>) => {
      state.currentCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      if (action.payload) state.quizCategories = action.payload;
    });
  },
});

export const { changeCategory } = quizSlice.actions;
