import { ColorPicker, theme } from "antd";
import { useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { GrMagic } from "react-icons/gr";
import { HiOutlineMail } from "react-icons/hi";
import ProfileLeftAvatar from "../ProfileLeftAvatar/ProfileLeftAvatar";

function ProfileLeft() {
  const { token } = theme.useToken();
  const [bgColor, setBgColor] = useState<string>(token.colorPrimary);
  console.log(bgColor);
  return (
    <div className="basis-1/3">
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white p-2 rounded-lg pt-3 shadow">
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
            <ProfileLeftAvatar />
          </div>
          <div className="text-center pt-16 px-4">
            <p className="font-primary tracking-wider font-medium text-gray-600">
              @ahnaf
            </p>
            <h3 className="font-medium tracking-wide text-2xl">
              Ahnaf Hasan Shifat
            </h3>
            <p className="font-primary tracking-wide text-gray-600">
              <span className="border-r-2 pr-2 mr-2 border-gray-300">
                Bangladesh
              </span>{" "}
              <span>Joined March 2023</span>{" "}
            </p>

            <p className="px-2 mt-4 font-primary text-sm tracking-wide leading-6">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut
              officia eos similique laboriosam aliquid quaerat. Eligendi labore
              delectus, earum rerum reiciendis ab est sit aperiam nesciunt dicta
              fugit eum. Nam.
            </p>
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
              <span className="ml-auto text-black text-sm  font-medium">
                www.ahnaf.com
              </span>
            </p>
            <p className="flex items-center text-lg text-gray-500">
              <span className="flex items-center font-primary text-  gap-2">
                <HiOutlineMail />
                E-mail
              </span>
              <span className="ml-auto text-black tracking-wide text-sm  font-medium">
                ahnaf@test.com
              </span>
            </p>
            <p className="flex items-center text-lg text-gray-500">
              <span className="flex items-center font-primary text- gap-2">
                <BsTelephone />
                Phone
              </span>
              <span className="ml-auto text-black  tracking-wide text-sm  font-medium">
                +8801639236879
              </span>
            </p>
            <p className="flex items-center text-lg text-gray-500">
              <span className="flex items-center font-primary text- gap-2">
                <AiOutlineCalendar />
                Joined
              </span>
              <span className="ml-auto text-black tracking-wide text-sm font-medium">
                12 March, 2023
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileLeft;
