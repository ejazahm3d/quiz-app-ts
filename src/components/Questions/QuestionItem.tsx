import React from "react";
import { Quiz } from "../../models/Quiz";

interface Props {
  quizItem: Quiz;
}

export const QuestionItem: React.FC<Props> = ({ quizItem }) => {
  return (
    <>
      <h1 dangerouslySetInnerHTML={{ __html: quizItem.question }}></h1>
      <ul>
        {quizItem.choices.map((choice) => (
          <li key={choice}>{choice}</li>
        ))}
      </ul>
    </>
  );
};
