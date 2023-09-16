import { Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Bookmark, Chat, Heart2 } from "react-iconly";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  getCommentThunk,
  postCommentThunk,
  postOrDeleteLikeThunk,
} from "../../slices/RouteSlice";
import { addBookmarkThunk } from "../../slices/SearchSlice";
import { RootState } from "../../store";
import Comments from "../Comments/Comments";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

function UserReview() {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const activeRoute = useSelector(
    (state: RootState) => state.route.activeRoute
  );
  const [text, setText] = useState("");
  const user = useSelector((state: RootState) => state.auth.user);
  const comments = useSelector((state: RootState) => state.route.comments);
  const dispatch = useDispatch();
  const bookmark = useSelector((state: RootState) => state.search.bookmarks);
  const location = useLocation();
  const paramId = location.pathname.split("/")[2];
  const render = useSelector((state: RootState) => state.search.render);

  useEffect(() => {
    if (bookmark) {
      let tmp = false;
      bookmark.forEach((bm) => {
        if (bm.routeId === paramId) tmp = tmp || true;
      });
      setBookmarked(tmp);
    }
  }, [bookmark, render]);

  const handleBookmark = () => {
    dispatch(addBookmarkThunk({ routeId: paramId }) as any);
    setBookmarked(!bookmarked);
  };

  useEffect(() => {
    if (activeRoute) {
      let tmp = false;
      activeRoute.likes?.forEach((rt) => {
        if (rt.userId === user?.id) tmp = tmp || true;
      });
      setLiked(tmp);
    }
  }, [activeRoute, user?.id]);

  const handleLike = () => {
    if (!user || !user.id) {
      toast.error("Sign in to continue");
      return;
    }

    if (activeRoute) {
      dispatch(postOrDeleteLikeThunk({ routeId: activeRoute.id }) as any);
    }
  };

  const handleComment = () => {
    if (!text) {
      toast.error("Comment content cant be empty");
      return;
    }
    dispatch(
      postCommentThunk({ routeId: activeRoute?.id as string, text }) as any
    );
    setText("");
  };

  if (!activeRoute) return <div></div>;

  return (
    <>
      <Toaster />
      <div className="absolute z-50 top-1/2 -translate-y-1/2 left-0 translate-x-4 bg-white grid gap-4 p-2 py-6 border border-gray-400 rounded-md shadow-lg">
        <div className="cursor-pointer" onClick={handleLike}>
          <Heart2
            set={`${liked ? "bold" : "broken"}`}
            primaryColor={`${liked ? "red" : "black"}`}
            size={"large"}
          />
          <h1 className="text-center font-medium mt-1">
            {activeRoute.likes?.length}
          </h1>
        </div>
        <div>
          <Dialog>
            <DialogTrigger>
              <div
                className="cursor-pointer"
                onClick={() => {
                  dispatch(getCommentThunk(activeRoute.id) as any);
                }}
              >
                <Chat set="broken" primaryColor="black" size={"large"} />
                <h1 className="text-center font-medium mt-1">
                  {activeRoute.comments?.length}
                </h1>
              </div>
            </DialogTrigger>
            <DialogContent>
              <Toaster />
              <DialogHeader>
                <DialogTitle className="text-xl">Comments</DialogTitle>
              </DialogHeader>
              <div className="bg-gray-100 rounded-lg pr-2 pb-3">
                <Textarea
                  fullWidth
                  shadow={false}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <button
                  className="flex ml-auto bg-black text-white p-2 text-xs px-3 tracking-wider rounded-lg font-medium"
                  onClick={handleComment}
                >
                  Publish
                </button>
              </div>
              <Comments comments={comments} />
            </DialogContent>
          </Dialog>
        </div>
        <div className="cursor-pointer" onClick={handleBookmark}>
          <Bookmark
            set={`${bookmarked ? "bold" : "broken"}`}
            primaryColor={`${bookmarked ? "green" : "black"}`}
            size={"large"}
          />
        </div>
      </div>
    </>
  );
}

export default UserReview;
