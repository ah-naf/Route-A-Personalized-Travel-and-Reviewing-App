import { Trash2 } from "lucide-react";
import { useEffect } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getUserRoutesThunk } from "../../slices/ProfileSlice";
import { deleteRouteThunk } from "../../slices/RouteSlice";
import { RootState } from "../../store";
import { calculateDate } from "../../util";

const ROUTES = [
  {
    id: "sdasff2",
    name: "Cumilla to Chattogram",
    publishedAt: "20 April 2023",
    review: {
      like: 2,
      comment: 3,
    },
  },
  {
    id: "ssdasff3",
    name: "Chattogram to Cumilla",
    publishedAt: "15 January 2023",
    review: {
      like: 5,
      comment: 10,
    },
  },
];

function UserRoutes() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const profileUser = useSelector(
    (state: RootState) => state.profile.profileUser
  );
  const userRoutes = useSelector(
    (state: RootState) => state.profile.userRoutes
  );

  useEffect(() => {
    if (profileUser) {
      dispatch(getUserRoutesThunk(profileUser.id) as any);
    }
  }, [profileUser]);


  return (
    <div className="px-3 pb-3 h-full max-h-full">
      <div className="border h-full p-2 py-3 mb-2 space-y-3">
        {userRoutes.map((rt, ind) => (
          <div
            key={rt.id}
            className="flex items-center bg-gray-100 p-3 rounded-md group hover:bg-orange-400 transition cursor-pointer shadow-sm"
          >
            <p className="text-2xl mr-4 font-semibold group-hover:text-white">
              {ind + 1}.
            </p>
            <div
              onClick={() => {
                window.location.href = "/create/" + rt.id;
              }}
            >
              <h3 className="font-medium group-hover:text-white text-lg">
                {rt.title}
              </h3>
              <p className="text-gray-700 font-normal group-hover:text-white text-sm">
                {calculateDate(rt.updatedAt)}
              </p>
              {user && profileUser && user.id === profileUser.id && (
                <p className="text-xs mt-1 text-gray-700 group-hover:text-white font-medium">
                  {rt.published ? "PUBLISHED" : "DRAFTED"}
                </p>
              )}
            </div>
            <div className="flex items-center text-sm gap-2 group-hover:text-white ml-auto">
              <div className="flex items-center ">
                <AiFillHeart size="20" />
                <span>{rt.likes?.length}</span>
              </div>
              <div className="flex item-center gap-1">
                <FaComment className="relative top-[1px]" size="18" />
                <span>{rt.comments?.length}</span>
              </div>
              {user && user?.id === profileUser?.id && (
                <button
                  className="border border-gray-700 rounded p-1 group-hover:border-white group-hover:bg-white"
                  onClick={() => {
                    dispatch(deleteRouteThunk(rt.id) as any);
                    window.location.reload()
                  }}
                >
                  <Trash2 className="w-4 h-4 group-hover:text-gray-700" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserRoutes;
