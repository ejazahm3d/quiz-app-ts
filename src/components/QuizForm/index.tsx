import React, { SyntheticEvent } from "react";
import { Select, Row, Button, Col } from "antd";
import { useAppDispatch } from "../../store";
import {
  Difficulty,
  changeDifficulty,
  changeCategory,
  makeQuiz,
} from "../../store/slices/quizSlice";
import { SelectValue } from "antd/lib/select";
import { TriviaCategory } from "../../models/TriviaCategory";
import { setGame, changeStep } from "../../store/slices/gameSlice";

const { Option } = Select;

interface Props {
  currentDifficulty: string;
  triviaCategories: TriviaCategory[];
  currentCategory: number;
}

export const QuizForm: React.FC<Props> = ({
  currentDifficulty,
  triviaCategories,
  currentCategory,
}) => {
  const dispatch = useAppDispatch();
  const handleDifficultyChange = (e: SelectValue): void => {
    if (typeof e === "string") {
      dispatch(changeDifficulty(e));
    }
  };
  const handleCategoryChange = (e: SelectValue): void => {
    if (typeof e === "number") {
      dispatch(changeCategory(e));
    }
  };
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await dispatch(makeQuiz({ currentCategory, currentDifficulty }));
    dispatch(setGame(true));
    dispatch(changeStep(0));
  };
  return (
    <form onSubmit={handleSubmit}>
      <Row justify="center">
        <Col style={{ margin: "1rem" }}>
          <Select
            size="large"
            style={{ width: "14rem" }}
            placeholder="Random"
            defaultValue={undefined}
            onChange={(e) => handleCategoryChange(e)}
          >
            {triviaCategories.map((category) => (
              <Option value={category.id} key={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Col>
        <Col style={{ margin: "1rem" }}>
          <Select
            size="large"
            style={{ width: "14rem" }}
            placeholder="Select your category"
            defaultValue={currentDifficulty}
            onChange={(e) => handleDifficultyChange(e)}
          >
            <Option value={Difficulty.Easy}>Easy</Option>
            <Option value={Difficulty.Medium}>Medium</Option>
            <Option value={Difficulty.Hard}>Hard</Option>
          </Select>
        </Col>
      </Row>
      <Row justify="center">
        <Col style={{ marginTop: "1.5rem" }}>
          <Button htmlType="submit" type="primary">
            Start Quiz
          </Button>
        </Col>
      </Row>
    </form>
  );
};
