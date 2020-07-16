import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { quizSlice } from "./slices/quizSlice";
import { useDispatch, useSelector } from "react-redux";

const rootReducer = combineReducers({
  quiz: quizSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
