import { ConfigProvider, Segmented } from "antd";
import { useState } from "react";
import UserActivity from "../UserActivity/UserActivity";
import UserRoutes from "../UserRoutes/UserRoutes";
import UserSetting from "../UserSetting/UserSetting";

function ProfileRight() {
  const [option, setOption] = useState("User Routes");

  return (
    <div className="bg-white rounded-lg basis-2/3 overflow-y-auto relative flex flex-col shadow">
      <div className="w-full text-center sticky top-0 py-3  z-50 bg-white ">
        <div className="mt-2 px-3">
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
              className="p-1 capitalize  tracking-wider bg-gray-100 "
            ></Segmented>
          </ConfigProvider>
        </div>
      </div>
      <div className="mt-2 flex-1">
        {option === "User Routes" && <UserRoutes />}
        {option === "Activity" && <UserActivity />}
        {option === "Settings" && <UserSetting />}
      </div>
    </div>
  );
}

export default ProfileRight;
