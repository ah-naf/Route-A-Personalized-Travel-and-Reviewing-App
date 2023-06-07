import { Avatar } from "@nextui-org/react";
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { BiHelpCircle } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";

function CreateRouteTopbar() {
  return (
    <div className=" flex flex-col justify-between items-center p-4 shadow-lg h-screen max-w-[50px] bg-white text-gray-600">
      <div className="flex flex-col items-center gap-2">
        <Avatar
          size="md"
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          color="warning"
          squared
        />
        <AiOutlineHome
          size={25}
          className="mt-4 hover:text-black cursor-pointer"
          title="Home"
        />
        <BiHelpCircle
          size={25}
          className="hover:text-black cursor-pointer"
          title="Help"
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-4 pb-2">
        <AiOutlineSetting
          size={25}
          className="hover:rotate-90 cursor-pointer"
          title="Setting"
        />
        <LuLogOut
          size={25}
          className="hover:text-red-600 cursor-pointer"
          title="Logout"
        />
      </div>
    </div>
  );
}

export default CreateRouteTopbar;
