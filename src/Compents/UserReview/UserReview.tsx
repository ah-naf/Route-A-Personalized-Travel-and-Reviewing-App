import { Textarea } from "@nextui-org/react";
import { useState } from "react";
import { Bookmark, Chat, Heart2 } from "react-iconly";
import Comments from "../Comments/Comments";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const COMMENTS = [
  {
    id: "1",
    username: "ahnaf",
    fullName: "Ahnaf Hasan Shifat",
    createdAt: "6m",
    comment:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem optio necessitatibus, quidem commodi vel sit fugiat magnam at aliquid repellat.",
  },
  {
    id: "2",
    username: "john",
    fullName: "John Doe",
    createdAt: "1hr",
    comment:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem optio necessitatibus, quidem commodi vel sit fugiat magnam at aliquid repellat.",
  },
];

function UserReview() {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div className="absolute z-50 top-1/2 -translate-y-1/2 left-0 translate-x-4 bg-white grid gap-4 p-2 py-6 border border-gray-400 rounded-md shadow-lg">
      <div className="cursor-pointer" onClick={() => setLiked(!liked)}>
        <Heart2
          set={`${liked ? "bold" : "broken"}`}
          primaryColor={`${liked ? "red" : "black"}`}
          size={"large"}
        />
        <h1 className="text-center font-medium mt-1">5</h1>
      </div>
      <div>
        <Dialog>
          <DialogTrigger>
            <div className="cursor-pointer">
              <Chat set="broken" primaryColor="black" size={"large"} />
              <h1 className="text-center font-medium mt-1">2</h1>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-xl">Comments</DialogTitle>
            </DialogHeader>
            <div className="bg-gray-100 rounded-lg pr-2 pb-3">
              <Textarea fullWidth shadow={false} />
              <button className="flex ml-auto bg-black text-white p-2 text-xs px-3 tracking-wider rounded-lg font-medium">
                Publish
              </button>
            </div>
            <Comments comments={COMMENTS} />
          </DialogContent>
        </Dialog>
      </div>
      <div
        className="cursor-pointer"
        onClick={() => setBookmarked(!bookmarked)}
      >
        <Bookmark
          set={`${bookmarked ? "bold" : "broken"}`}
          primaryColor={`${bookmarked ? "green" : "black"}`}
          size={"large"}
        />
      </div>
    </div>
  );
}

export default UserReview;
