import { Badge } from "@nextui-org/react";
import { AiFillDelete, AiFillHeart } from "react-icons/ai";
import { BsBookmarkHeart } from "react-icons/bs";
import { FaComment } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addBookmarkThunk, deleteAllBookmarkThunk, setRenderSearchSlice } from "../../slices/SearchSlice";
import { RootState } from "../../store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

function Bookmarks() {
  const bookmarks = useSelector((state: RootState) => state.search.bookmarks);
  const dispatch = useDispatch();

  const handleBookmarkDelete = (routeId: string) => {
    dispatch(addBookmarkThunk({ routeId }) as any);
    dispatch(setRenderSearchSlice())
  };

  const handleClearAll = () => {
    dispatch(deleteAllBookmarkThunk() as any)
    dispatch(setRenderSearchSlice())
  }

  return (
    <Dialog>
      <DialogTrigger>
        <div className="mt-2">
          <Badge
            color="warning"
            size="md"
            content={bookmarks ? bookmarks.length : 0}
          >
            <BsBookmarkHeart
              size="25"
              className="text-gray-600 hover:text-black cursor-pointer"
            />
          </Badge>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">Bookmarked Routes</DialogTitle>
        </DialogHeader>
        <div className="mt-2 mb-2 space-y-3">
          {bookmarks &&
            bookmarks.map((rt, ind) => (
              <div
                key={rt.id}
                className="flex items-center bg-gray-100 p-2  rounded group hover:bg-orange-400 transition cursor-pointer"
              >
                <p className="text-xl mr-3 font-semibold group-hover:text-white">
                  {ind + 1}.
                </p>
                <div
                  onClick={() => {
                    window.location.href = "/route/" + rt.routeId;
                  }}
                >
                  <h3 className="font-medium group-hover:text-white">
                    {rt.route?.title}
                  </h3>
                  <p className="text-xs text-gray-700 leading-4 group-hover:text-gray-100 font-light">
                    By:{" "}
                    <span className="text-gray-900 font-normal group-hover:text-white text-sm">
                      {rt.route?.user?.username}
                    </span>
                  </p>
                </div>
                <div className="flex items-center text-sm gap-2 group-hover:text-white ml-auto">
                  <div className="flex items-center gap-1">
                    <AiFillHeart />
                    <span>{rt.route?.likes?.length}</span>
                  </div>
                  <div className="flex item-center gap-1">
                    <FaComment className="relative top-[3px]" size="14" />
                    <span>{rt.route?.comments?.length}</span>
                  </div>
                  <span onClick={() => handleBookmarkDelete(rt.routeId)}>
                    <AiFillDelete size="18" />
                  </span>
                </div>
              </div>
            ))}
            <div className="w-full text-center !mt-6">
              <button className="border-2 p-1 px-6 hover:bg-orange-400 hover:border-orange-400 rounded font-medium hover:text-white border-gray-200 bg-gray-200" onClick={handleClearAll}>Clear All</button>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Bookmarks;
