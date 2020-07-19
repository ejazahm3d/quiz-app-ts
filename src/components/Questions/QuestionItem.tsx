import React from "react";
import { Quiz } from "../../models/Quiz";
import { Row, Col, Radio } from "antd";
import { useAppDispatch } from "../../store";
import { addAnswer } from "../../store/slices/gameSlice";
import { RadioChangeEvent } from "antd/lib/radio";

interface Props {
  quizItem: Quiz;
  isAnswered: boolean;
  setIsAnswered: React.Dispatch<React.SetStateAction<boolean>>;
}

export const QuestionItem: React.FC<Props> = ({
  quizItem,
  isAnswered,
  setIsAnswered,
}) => {
  const dispatch = useAppDispatch();
  const checkAnswer = (e: RadioChangeEvent) => {
    if (e.target.value === quizItem.correctAnswer) {
      dispatch(
        addAnswer({
          answer: e.target.value,
          isCorrect: true,
          correctAnswer: quizItem.correctAnswer,
          question: quizItem.question,
        })
      );
    } else {
      dispatch(
        addAnswer({
          answer: e.target.value,
          isCorrect: false,
          correctAnswer: quizItem.correctAnswer,
          question: quizItem.question,
        })
      );
    }
    setIsAnswered(true);
  };
  return (
    <>
      <Row justify="center">
        <Col>
          <h3 dangerouslySetInnerHTML={{ __html: quizItem.question }}></h3>
        </Col>
      </Row>

      <Row justify="center">
        <Col>
          <Radio.Group onChange={checkAnswer}>
            {quizItem.choices.map((choice) => (
              <Radio disabled={isAnswered} key={choice} value={choice}>
                {choice}
              </Radio>
            ))}
          </Radio.Group>
        </Col>
      </Row>
    </>
  );
};
