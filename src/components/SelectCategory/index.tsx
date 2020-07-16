import React, { useState } from "react";
import { TriviaCategory } from "../../models/TriviaCategory";
import { Select, Row } from "antd";
import { useAppDispatch } from "../../store";
import { changeCategory } from "../../store/slices/quizSlice";

const { Option } = Select;
interface Props {
  triviaCategories: TriviaCategory[];
}

export const SelectCategory: React.FC<Props> = ({ triviaCategories }) => {
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState(triviaCategories?.[0]?.id);
  const handleCategoryChange = (e: number): void => {
    setCategory(e);
    dispatch(changeCategory(e));
    console.log(category);
  };
  return (
    <>
      <Row justify="center">
        <Select
          size="large"
          style={{ width: "14rem" }}
          placeholder="Select your category"
          defaultValue={category}
          onChange={(e) => handleCategoryChange(e)}
        >
          {triviaCategories.map((category) => (
            <Option value={category.id} key={category.id}>
              {category.name}
            </Option>
          ))}
        </Select>
      </Row>
    </>
  );
};
