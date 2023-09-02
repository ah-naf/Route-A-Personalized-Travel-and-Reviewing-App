import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { BiHelpCircle, BiLogIn } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../store";
import Bookmarks from "../Bookmarks/Bookmarks";
import UserNavbarMenu from "../UserNavbarMenu/UserNavbarMenu";

function CreateRouteTopbar() {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <div className=" flex flex-col justify-between items-center p-4 shadow-lg h-screen max-w-[55px] bg-white text-gray-600 border">
      <div className="flex flex-col items-center gap-2">
        {user && <UserNavbarMenu />}

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
      {user ? (
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
      ) : (
        <div className="mb-4">
          <Link to={"/login"}>
            <BiLogIn
              size={35}
              className="mt-4 hover:text-black cursor-pointer relative right-1"
              title="Login"
            />
          </Link>
        </div>
      )}
    </div>
  );
}

export default CreateRouteTopbar;
