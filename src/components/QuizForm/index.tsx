import React, { SyntheticEvent } from "react";
import { Select, Row, Button } from "antd";
import { useAppDispatch } from "../../store";
import {
  Difficulty,
  changeDifficulty,
  changeCategory,
} from "../../store/slices/quizSlice";
import { SelectValue } from "antd/lib/select";
import { TriviaCategory } from "../../models/TriviaCategory";

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
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(currentDifficulty, currentCategory);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Row justify="center">
        <Select
          size="large"
          style={{ width: "14rem" }}
          placeholder="Select your category"
          defaultValue={undefined}
          onChange={(e) => handleCategoryChange(e)}
        >
          {triviaCategories.map((category) => (
            <Option value={category.id} key={category.id}>
              {category.name}
            </Option>
          ))}
        </Select>
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
        <Button htmlType="submit" type="primary">
          Start Quiz
        </Button>
      </Row>
    </form>
  );
};
