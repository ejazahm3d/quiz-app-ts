import React, { useEffect } from "react";
import { useAppDispatch, RootState } from "../store";
import { fetchCategories } from "../store/slices/quizSlice";
import { useSelector } from "react-redux";
import { TriviaCategory } from "../models/TriviaCategory";
import { SelectCategory } from "../components/SelectCategory";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const triviaCategories = useSelector<RootState, TriviaCategory[]>(
    (state) => state?.quiz?.quizCategories ?? []
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div style={{ height: "100vh" }}>
      <SelectCategory triviaCategories={triviaCategories} />
    </div>
  );
};

export default HomePage;
