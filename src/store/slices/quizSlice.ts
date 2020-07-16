import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TriviaCategory } from "../../models/TriviaCategory";
import axios from "axios";

const BASE_URL = "https://opentdb.com/";

interface QuizState {
  quizCategories: TriviaCategory[];
}

const initialState: QuizState = {
  quizCategories: [],
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      if (action.payload) state.quizCategories = action.payload;
    });
  },
});
