import React from "react";
import { Quiz } from "../../models/Quiz";
import { Typography, Row, Col, Button } from "antd";

interface Props {
  quizItem: Quiz;
}

export const QuestionItem: React.FC<Props> = ({ quizItem }) => {
  return (
    <>
      <h3 dangerouslySetInnerHTML={{ __html: quizItem.question }}></h3>

      {quizItem.choices.map((choice) => (
        <Row>
          <Col>
            <Button key={choice}>{choice}</Button>
          </Col>
        </Row>
      ))}
    </>
  );
};
