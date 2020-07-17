import React from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { QuizState } from "../../store/slices/quizSlice";
import { QuestionItem } from "./QuestionItem";
import { GameState, changeStep } from "../../store/slices/gameSlice";

const TOTAL_QUESTIONS = 10;

interface Props {}
export const Questions: React.FC<Props> = () => {
  const quizState = useSelector<RootState, QuizState>((state) => state?.quiz);
  const { step } = useSelector<RootState, GameState>((state) => state.game);
  const dispatch = useAppDispatch();
  const quizes = quizState?.quizes;

  console.log(step);
  return (
    <>
      {quizes.length > 0}

      {quizes.length > 0 && quizes?.[step] && (
        <>
          <QuestionItem quizItem={quizes[step]} />
          <button onClick={() => dispatch(changeStep(step + 1))}>Next</button>
        </>
      )}
      {step > TOTAL_QUESTIONS - 1 && (
        <div>
          You are done
          <button onClick={() => dispatch(changeStep(0))}>PlayAgain?</button>
        </div>
      )}
    </>
  );
};
