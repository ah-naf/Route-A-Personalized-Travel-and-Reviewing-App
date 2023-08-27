import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { verifyUserThunk } from "../../slices/AuthSlice";
import { RootState } from "../../store";
import Bookmarks from "../Bookmarks/Bookmarks";
import CreateRouteDialog from "../CreateRouteDialog/CreateRouteDialog";
import UserNavbarMenu from "../UserNavbarMenu/UserNavbarMenu";

function Navbar() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyUserThunk() as any);
  }, []);

  return (
    <div className="flex items-center justify-between p-6 py-4 lg:px-12 sticky top-0 bg-transparent backdrop-blur-md font-secondary font-[500]">
      <Link to={"/"}>
        <h1 className="text-3xl tracking-wider cursor-pointer">
          <span className="text-orange-300">r</span>ou
          <span className="text-sky-400">te</span>
        </h1>
      </Link>
      <div className="flex items-center gap-4 text-sm">
        <button className="hover:underline">
          <Link to={"/discover"}>Discover</Link>
        </button>
        <button className="hover:underline">Explore</button>
        {user ? (
          <>
            <CreateRouteDialog />
            <UserNavbarMenu />
          </>
        ) : (
          <>
            <button className="hover:underline">
              <Link to={"/login"}>Sign in</Link>
            </button>
            <button className="bg-orange-400 p-2 px-5 text-white rounded">
              <Link to={"/register"}>Register</Link>
            </button>
          </>
        )}
        <Bookmarks />
      </div>
    </div>
  );
}

export default Navbar;
