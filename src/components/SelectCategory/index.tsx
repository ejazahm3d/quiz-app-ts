import React from "react";
import { TriviaCategory } from "../../models/TriviaCategory";
import { Select, Row } from "antd";
import { useAppDispatch } from "../../store";
import { changeCategory } from "../../store/slices/quizSlice";
import { SelectValue } from "antd/lib/select";

const { Option } = Select;
interface Props {
  triviaCategories: TriviaCategory[];
}

export const SelectCategory: React.FC<Props> = ({ triviaCategories }) => {
  const dispatch = useAppDispatch();
  const handleCategoryChange = (e: SelectValue): void => {
    if (typeof e === "number") {
      dispatch(changeCategory(e));
    }
  };
  return (
    <>
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
      </Row>
    </>
  );
};
