import { ConfigProvider, Segmented } from "antd";
import { useState } from "react";

function ProfileRight() {
  const [option, setOption] = useState("User Routes");

  return (
    <div className="bg-white rounded-lg basis-2/3">
      <div className="p-3 w-full text-center ">
        <ConfigProvider
          theme={{
            components: {
              Segmented: { itemColor: "gray", itemHoverColor: "blue" },
            },
          }}
        >
          <Segmented
            block
            options={["User Routes", "Activity", "Settings"]}
            value={option}
            onChange={(e) => setOption(e as string)}
            size="large"
            className="p-1 capitalize  tracking-wider bg-gray-100"
          ></Segmented>
        </ConfigProvider>
      </div>
    </div>
  );
}

export default ProfileRight;
