import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Quiz } from "../../models/Quiz";
import { QuestionItem } from "./QuestionItem";

interface Props {}

export const Questions: React.FC<Props> = () => {
  const quizes = useSelector<RootState, Quiz[]>((state) => state.quiz.quizes);

  return (
    <>
      {quizes.length > 0 &&
        quizes.map((item) => <QuestionItem quizItem={item} />)}
    </>
  );
};
