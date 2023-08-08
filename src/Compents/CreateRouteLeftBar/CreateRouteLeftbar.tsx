import { Badge } from "@nextui-org/react";
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { BiHelpCircle } from "react-icons/bi";
import { BsBookmarkHeart } from "react-icons/bs";
import { LuLogOut } from "react-icons/lu";
import { Link } from "react-router-dom";
import UserNavbarMenu from "../UserNavbarMenu/UserNavbarMenu";
import Bookmarks from "../Bookmarks/Bookmarks";

function CreateRouteTopbar() {
  return (
    <div className=" flex flex-col justify-between items-center p-4 shadow-lg h-screen max-w-[55px] bg-white text-gray-600 border">
      <div className="flex flex-col items-center gap-2">
        <UserNavbarMenu />
        <Link to={"/"}>
          <AiOutlineHome
            size={25}
            className="mt-4 hover:text-black cursor-pointer"
            title="Home"
          />
        </Link>
        <BiHelpCircle
          size={25}
          className="hover:text-black cursor-pointer"
          title="Help"
        />
        <Bookmarks />
      </div>
      <div className="flex flex-col justify-center items-center gap-4 pb-2">
        <Link to={"/profile?tab=setting"}>
          <AiOutlineSetting
            size={25}
            className="hover:rotate-90 cursor-pointer"
            title="Setting"
          />
        </Link>
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
