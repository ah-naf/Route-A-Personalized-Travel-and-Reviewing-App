import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Navbar from "../Compents/Navbar/Navbar";
import ProfileLeft from "../Compents/ProfileLeft/ProfileLeft";
import ProfileRight from "../Compents/ProfileRight/ProfileRight";
import { getUserThunk } from "../slices/AuthSlice";
import { RootState } from "../store";

function Profile() {
  const location = useLocation();
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const paramId = location.pathname.split("/")[2];

  useEffect(() => {
    if (paramId) {
      if (!paramId) {
        window.location.href = "/";
        return;
      }
      dispatch(getUserThunk(paramId) as any);
    } else {
      window.location.href = "/";
    }
  }, [paramId]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="bg-[whitesmoke] flex-grow pt-8">
        <div className="flex gap-8 max-w-6xl mx-auto max-h-[680px]">
          <ProfileLeft />
          <ProfileRight />
        </div>
      </div>
    </div>
  );
}

export default Profile;
