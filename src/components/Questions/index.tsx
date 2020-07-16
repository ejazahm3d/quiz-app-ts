import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Quiz } from "../../models/Quiz";
import { QuestionItem } from "./QuestionItem";

interface Props {}
const TOTAL_QUESTIONS = 10;
export const Questions: React.FC<Props> = () => {
  const [step, setStep] = useState(0);
  const quizes = useSelector<RootState, Quiz[]>((state) => state.quiz.quizes);
  console.log(step);
  return (
    <>
      {quizes.length > 0}

      {quizes.length > 0 && quizes?.[step] && (
        <>
          <QuestionItem quizItem={quizes[step]} />
          <button onClick={() => setStep(step + 1)}>Next</button>
        </>
      )}
      {step > TOTAL_QUESTIONS - 1 && <div>You are done</div>}
    </>
  );
};
