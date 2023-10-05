import { ConfigProvider, Segmented } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "../../store";
import UserActivity from "../UserActivity/UserActivity";
import UserPlaceReviews from "../UserPlaceReviews/UserPlaceReviews";
import UserRoutes from "../UserRoutes/UserRoutes";
import UserSetting from "../UserSetting/UserSetting";

function ProfileRight() {
  const [option, setOption] = useState("User Routes");
  const auth = useSelector((state: RootState) => state.auth);
  const profileUser = useSelector(
    (state: RootState) => state.profile.profileUser
  );
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search).get("tab");
  const [options, setOptions] = useState([
    "User Routes",
    "Place Reviews",
    "Settings",
  ]);

  useEffect(() => {
    if (queryParams === "setting") setOption("Settings");
    if (auth.user?.id && profileUser?.id && auth.user?.id != profileUser?.id)
      setOptions(options.filter((val) => val !== "Settings"));
  }, [queryParams, profileUser?.id, auth.user?.id]);

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
              options={options}
              value={option}
              onChange={(e) => setOption(e as string)}
              size="large"
              className="p-1 capitalize  tracking-wider bg-gray-100 "
            ></Segmented>
          </ConfigProvider>
        </div>
      </div>
      <div className="mt-2 flex-1 ">
        {option === "User Routes" && <UserRoutes />}
        {option === "Activity" && <UserActivity />}
        {option === "Place Reviews" && <UserPlaceReviews />}
        {option === "Settings" && <UserSetting />}
      </div>
    </div>
  );
}

export default ProfileRight;
