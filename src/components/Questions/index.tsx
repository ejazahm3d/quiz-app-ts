import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { QuizState } from "../../store/slices/quizSlice";
import { QuestionItem } from "./QuestionItem";
import { GameState, changeStep, setGame } from "../../store/slices/gameSlice";
import { Button, Row, Col, Typography, Card } from "antd";

export const TOTAL_QUESTIONS = 10;

interface Props {}
export const Questions: React.FC<Props> = () => {
  const [isAnswered, setIsAnswered] = useState(false);
  const quizState = useSelector<RootState, QuizState>((state) => state?.quiz);
  const { step, score: currentScore, started: isGameStarted } = useSelector<
    RootState,
    GameState
  >((state) => state.game);

  const dispatch = useAppDispatch();
  const quizes = quizState?.quizes;

  const onNextClick = () => {
    setIsAnswered(false);
    dispatch(changeStep(step + 1));
    if (step === TOTAL_QUESTIONS - 1) {
      dispatch(setGame(false));
    }
  };

  return (
    <>
      {quizes.length > 0 && quizes?.[step] && (
        <Row justify="center">
          <Card style={{ minHeight: "15rem", padding: "3rem" }}>
            {isGameStarted && (
              <Typography.Title
                level={3}
                type="danger"
                style={{ textAlign: "center" }}
              >
                Score: {currentScore}
              </Typography.Title>
            )}
            <Row justify="center">
              <Col>
                <Typography.Title level={4} type="secondary">
                  Question: {step + 1} / {TOTAL_QUESTIONS}
                </Typography.Title>
              </Col>
            </Row>
            <QuestionItem
              quizItem={quizes[step]}
              isAnswered={isAnswered}
              setIsAnswered={setIsAnswered}
            />
            {isAnswered && (
              <Row justify="center" style={{ marginTop: "1rem" }}>
                <Col>
                  <Button type="primary" onClick={() => onNextClick()}>
                    {step === TOTAL_QUESTIONS - 1 ? "Finish" : "Next"}
                  </Button>
                </Col>
              </Row>
            )}
          </Card>
        </Row>
      )}
      {step > TOTAL_QUESTIONS - 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1.5rem",
            fontSize: "2rem",
            textAlign: "center",
            padding: "1rem",
          }}
        >
          You are done. Your score was {currentScore}
        </div>
      )}
    </>
  );
};
