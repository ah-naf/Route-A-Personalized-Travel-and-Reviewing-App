import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import React from "react";

interface RatingPropType {
  size?: string;
  disabled?: boolean;
  value?: number;
  onValueChange?: React.Dispatch<React.SetStateAction<any>>;
}

const Rating = ({
  onValueChange,
  size = "3xl",
  disabled = false,
  value = 3,
}: RatingPropType) => {
  const customIcons: Record<number, React.ReactNode> = {
    1: <FrownOutlined className={`text-${size}`} />,
    2: <FrownOutlined className={`text-${size}`} />,
    3: <MehOutlined className={`text-${size}`} />,
    4: <SmileOutlined className={`text-${size}`} />,
    5: <SmileOutlined className={`text-${size}`} />,
  };

  return (
    <div className=" flex items-center">
      {!disabled && <h1 className="mr-4 font-medium text-lg">Rating: </h1>}
      <Rate
        value={value}
        allowClear
        allowHalf
        disabled={disabled}
        onChange={(e) => {
          if (onValueChange) {
            onValueChange(e);
          }
        }}
        character={({ index }) => {
          return customIcons[(index as number) + 1];
        }}
      />
    </div>
  );
};

export default Rating;
