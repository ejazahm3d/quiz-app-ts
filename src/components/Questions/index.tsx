import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { QuizState } from "../../store/slices/quizSlice";
import { QuestionItem } from "./QuestionItem";
import { GameState, changeStep, setGame } from "../../store/slices/gameSlice";
import { Button, Row, Col } from "antd";

export const TOTAL_QUESTIONS = 10;

interface Props {}
export const Questions: React.FC<Props> = () => {
  const [isAnswered, setIsAnswered] = useState(false);
  const quizState = useSelector<RootState, QuizState>((state) => state?.quiz);
  const { step, score: currentScore } = useSelector<RootState, GameState>(
    (state) => state.game
  );
  const dispatch = useAppDispatch();
  const quizes = quizState?.quizes;

  console.log(step);
  return (
    <>
      {quizes.length > 0 && quizes?.[step] && (
        <>
          <QuestionItem
            quizItem={quizes[step]}
            isAnswered={isAnswered}
            setIsAnswered={setIsAnswered}
          />
          {isAnswered && (
            <Row justify="center">
              <Col>
                <Button
                  type="primary"
                  onClick={() => {
                    setIsAnswered(false);
                    dispatch(changeStep(step + 1));
                    if (step === TOTAL_QUESTIONS - 1) {
                      dispatch(setGame(false));
                    }
                  }}
                >
                  {step === TOTAL_QUESTIONS - 1 ? "Finish" : "Next"}
                </Button>
              </Col>
            </Row>
          )}
        </>
      )}
      {step > TOTAL_QUESTIONS - 1 && (
        <div>You are done. Your score was {currentScore}</div>
      )}
    </>
  );
};
