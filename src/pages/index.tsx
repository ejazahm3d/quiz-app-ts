import React, { useEffect } from "react";
import { useAppDispatch, RootState } from "../store";
import { fetchCategories, Difficulty } from "../store/slices/quizSlice";
import { useSelector } from "react-redux";
import { TriviaCategory } from "../models/TriviaCategory";
import { QuizForm } from "../components/QuizForm";
import { Questions } from "../components/Questions";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const triviaCategories = useSelector<RootState, TriviaCategory[]>(
    (state) => state?.quiz?.quizCategories ?? []
  );
  const currentDifficulty = useSelector<RootState, Difficulty | string>(
    (state) => state.quiz.difficulty
  );

  const currentCategory = useSelector<RootState, number>(
    (state) => state?.quiz?.currentCategory ?? 0
  );

  const isGameStarted = useSelector<RootState, boolean>(
    (state) => state.game.started
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div>
      {!isGameStarted && (
        <QuizForm
          triviaCategories={triviaCategories}
          currentDifficulty={currentDifficulty}
          currentCategory={currentCategory}
        />
      )}

      <Questions />
    </div>
  );
};

export default HomePage;
