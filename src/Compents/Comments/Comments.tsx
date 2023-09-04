import { BigHead } from "@bigheads/core";
import { Trash2Icon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentThunk } from "../../slices/RouteSlice";
import { RootState } from "../../store";
import { CommentType } from "../../util";

function Comments({ comments }: { comments: CommentType[] }) {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const calcDate = (dateStr: string) => {
    // Parse the input date string into a Date object
    const postDate = new Date(dateStr);

    // Get the current date and time
    const currentDate = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference: number = currentDate.getTime() - postDate.getTime();

    // Define time intervals in milliseconds
    const minute = 60 * 1000; // 1 minute = 60 seconds
    const hour = 60 * minute; // 1 hour = 60 minutes
    const day = 24 * hour; // 1 day = 24 hours

    // Calculate the difference in minutes, hours, or days
    if (timeDifference < minute) {
      const secondsAgo = Math.floor(timeDifference / 1000);
      return `${secondsAgo}s ago`;
    } else if (timeDifference < hour) {
      const minutesAgo = Math.floor(timeDifference / minute);
      return `${minutesAgo}m ago`;
    } else if (timeDifference < day) {
      const hoursAgo = Math.floor(timeDifference / hour);
      return `${hoursAgo}hr ago`;
    } else {
      const daysAgo = Math.floor(timeDifference / day);
      return `${daysAgo}d ago`;
    }
  };

  return (
    <div className="mt-4">
      {comments.length > 0 ? (
        comments.map((cmnt) => (
          <div key={cmnt.id} className="border-t py-3">
            <div className="flex items-center gap-2 ">
              <div className="w-12 h-10">
                <BigHead {...cmnt.user?.avatar} />
              </div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  window.location.href = "/profile/" + cmnt.user?.id;
                }}
              >
                <h3 className="font-medium tracking-wide">{cmnt.user?.name}</h3>
                <p className="text-xs leading-3 text-gray-600">
                  @{cmnt.user?.username}
                </p>
              </div>
              <p className="text-sm text-gray-700 ml-1">
                {calcDate(cmnt.createdAt as string)}
              </p>
              {user && user.id === cmnt.userId && (
                <button
                  className="ml-auto"
                  onClick={() => {
                    console.log(cmnt.id);
                    dispatch(deleteCommentThunk(cmnt.id) as any);
                  }}
                >
                  <Trash2Icon className="w-4 h-4 hover:text-red-600" />
                </button>
              )}
            </div>
            <p className="px-2 mt-3 leading-6">{cmnt.text}</p>
          </div>
        ))
      ) : (
        <p className="font-medium text-center">No comment found</p>
      )}
    </div>
  );
}

export default Comments;
