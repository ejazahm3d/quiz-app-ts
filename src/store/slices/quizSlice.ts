import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { TriviaCategory } from "../../models/TriviaCategory";
import axios from "axios";
import { QuizResponseDto } from "../../dtos/QuizResponseDto";
import { Quiz } from "../../models/Quiz";
import { shuffleArray } from "../../utils";

const BASE_URL = "https://opentdb.com";

export enum Difficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}
export interface QuizState {
  quizCategories: TriviaCategory[];
  currentCategory: number;
  difficulty: Difficulty | string;
  quizes: Quiz[];
}

const initialState: QuizState = {
  quizCategories: [],
  currentCategory: 0,
  difficulty: Difficulty.Easy,
  quizes: [],
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
      const res = await axios.get<{ results: QuizResponseDto[] }>(
        `${BASE_URL}/api.php?amount=10&category=${data.currentCategory}&difficulty=${data.currentDifficulty}&type=multiple`
      );
      return res.data?.results;
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
    builder.addCase(makeQuiz.fulfilled, (state, action) => {
      const mappedQuizes = action.payload?.map((quiz) => {
        const question = quiz?.question;
        const correctAnswer = quiz?.correct_answer;
        quiz?.incorrect_answers?.push(correctAnswer);
        const choices = shuffleArray<string>(quiz?.incorrect_answers);
        const categoryName = quiz?.category;
        return {
          question,
          correctAnswer,
          choices,
          categoryName,
        };
      });

      state.quizes = mappedQuizes ?? [];
    });
  },
});

export const { changeCategory, changeDifficulty } = quizSlice.actions;
