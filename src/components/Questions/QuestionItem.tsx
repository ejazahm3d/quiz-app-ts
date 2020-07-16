import React from "react";
import { Quiz } from "../../models/Quiz";

interface Props {
  quizItem: Quiz;
}

export const QuestionItem: React.FC<Props> = ({ quizItem }) => {
  return <>{quizItem.question}</>;
};
