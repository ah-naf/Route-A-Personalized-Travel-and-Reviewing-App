import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import React from "react";

const customIcons: Record<number, React.ReactNode> = {
  1: <FrownOutlined className="text-3xl " />,
  2: <FrownOutlined className="text-3xl " />,
  3: <MehOutlined className="text-3xl " />,
  4: <SmileOutlined className="text-3xl " />,
  5: <SmileOutlined className="text-3xl " />,
};

const Rating: React.FC = ({ onValueChange }) => (
  <div className="mt-4 flex items-center">
    <h1 className="mr-4 font-medium text-lg">Rating: </h1>
    <Rate
      defaultValue={3}
      allowClear
      allowHalf
      onChange={(e) => onValueChange(e)}
      character={({ index }) => {
        return customIcons[(index as number) + 1];
      }}
    />
  </div>
);

export default Rating;
