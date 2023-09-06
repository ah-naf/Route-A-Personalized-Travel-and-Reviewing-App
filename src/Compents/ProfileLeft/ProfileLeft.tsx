import { BigHead } from "@bigheads/core";
import { Skeleton } from "@mui/material";
import { ColorPicker, theme } from "antd";
import { useEffect, useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { GrMagic } from "react-icons/gr";
import { HiOutlineMail } from "react-icons/hi";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const MONTH = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function ProfileLeft() {
  const { token } = theme.useToken();
  const [bgColor, setBgColor] = useState<string>(token.colorPrimary);
  const loading = useSelector((state: RootState) => state.profile.loading);

  const profileUser = useSelector(
    (state: RootState) => state.profile.profileUser
  );
  const [joined, setJoined] = useState({
    month: "",
    day: 1,
    year: 2023,
  });

  useEffect(() => {
    if (profileUser && profileUser?.createdAt) {
      const date = new Date(profileUser.createdAt);

      setJoined({
        month: MONTH[date.getMonth()],
        year: date.getFullYear(),
        day: date.getDate(),
      });
    }
  }, [profileUser]);

  return (
    <div className="basis-1/3">
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white p-2 rounded-lg pt-3 shadow">
          {loading ? (
            <div className="flex flex-col items-center gap-4">
              <Skeleton
                variant="rectangular"
                className="min-w-full"
                height={150}
              />
              <Skeleton variant="circular" height={60} width={60} />
            </div>
          ) : (
            <div
              className={`h-36 rounded-lg relative`}
              style={{ backgroundColor: bgColor }}
            >
              <span className="absolute bg-white p-1 -translate-x-1 -translate-y-1 shadow-lg rounded-full bottom-0 right-0 cursor-pointer">
                <ColorPicker
                  value={bgColor}
                  onChange={(e) =>
                    setBgColor(typeof e === "string" ? e : e.toHexString())
                  }
                >
                  <GrMagic size="15" />
                </ColorPicker>
              </span>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 shadow-lg w-24 h-24 bg-white rounded-full pb-4 px-1 flex items-center">
                <BigHead {...profileUser?.avatar} />
              </div>
            </div>
          )}
          <div className={`text-center ${loading ? "pt-4" : "pt-16"} px-4`}>
            {loading ? (
              <div className="flex justify-center">
                <Skeleton variant="text" width={80} className="" />
              </div>
            ) : (
              <p className="font-primary tracking-wider font-medium text-gray-600">
                @{profileUser?.username}
              </p>
            )}
            {loading ? (
              <div className="flex justify-center">
                <Skeleton variant="text" className="w-full" />
              </div>
            ) : (
              <h3 className="font-medium tracking-wide text-2xl">
                {profileUser?.name}
              </h3>
            )}
            {loading ? (
              <div className="flex justify-center gap-4 max-w-[80%] mx-auto">
                <Skeleton variant="text" className="w-full" />
                <Skeleton variant="text" className="w-full" />
              </div>
            ) : (
              <p className="font-primary tracking-wide text-gray-600">
                <span className="border-r-2 pr-2 mr-2 border-gray-300">
                  Bangladesh
                </span>{" "}
                <span>
                  Joined {joined.month} {joined.year}
                </span>{" "}
              </p>
            )}
            {loading ? (
              <Skeleton variant="text" className="w-full" height={100} />
            ) : (
              <p className="px-2 mt-4 font-primary text-sm tracking-wide leading-6">
                {profileUser?.bio}
              </p>
            )}
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg pb-5 shadow">
          <h1 className="text-2xl font-medium mb-3">Information</h1>
          <div className="grid gap-2">
            <p className="flex items-center text-lg text-gray-500">
              <span className="flex items-center font-primary text- tracking-wide gap-2">
                <CgWebsite />
                Website
              </span>
              {loading ? (
                <Skeleton variant="text" className="ml-auto" width={100} />
              ) : (
                <span className="ml-auto text-black text-sm  font-medium">
                  {profileUser?.url}
                </span>
              )}
            </p>
            <p className="flex items-center text-lg text-gray-500">
              <span className="flex items-center font-primary text-  gap-2">
                <HiOutlineMail />
                E-mail
              </span>
              {loading ? (
                <Skeleton variant="text" className="ml-auto" width={100} />
              ) : (
                <span className="ml-auto text-black tracking-wide text-sm  font-medium">
                  {profileUser?.email}
                </span>
              )}
            </p>
            <p className="flex items-center text-lg text-gray-500">
              <span className="flex items-center font-primary text- gap-2">
                <BsTelephone />
                Phone
              </span>
              {loading ? (
                <Skeleton variant="text" className="ml-auto" width={100} />
              ) : (
                <span className="ml-auto text-black  tracking-wide text-sm  font-medium">
                  {profileUser?.phone}
                </span>
              )}
            </p>
            <p className="flex items-center text-lg text-gray-500">
              <span className="flex items-center font-primary text- gap-2">
                <AiOutlineCalendar />
                Joined
              </span>
              {loading ? (
                <Skeleton variant="text" className="ml-auto" width={100} />
              ) : (
                <span className="ml-auto text-black tracking-wide text-sm font-medium">
                  {joined.day} {joined.month} {joined.year}
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileLeft;
