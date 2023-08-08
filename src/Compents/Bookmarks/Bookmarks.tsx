import { Badge } from "@nextui-org/react";
import { AiFillDelete, AiFillHeart } from "react-icons/ai";
import { BsBookmarkHeart } from "react-icons/bs";
import { FaComment } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const ROUTES = [
  {
    id: "sdasff2",
    name: "Cumilla to Chattogram",
    publishedBy: "ahnaf",
    review: {
      like: 2,
      comment: 3,
    },
  },
  {
    id: "ssdasff3",
    name: "Chattogram to Cumilla",
    publishedBy: "shifat",
    review: {
      like: 5,
      comment: 10,
    },
  },
];

function Bookmarks() {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="mt-2">
          <Badge color="warning" size="md" content="5">
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
          {ROUTES.map((rt, ind) => (
            <div
              key={rt.id}
              className="flex items-center bg-gray-100 p-2  rounded group hover:bg-orange-400 transition cursor-pointer"
            >
              <p className="text-xl mr-3 font-semibold group-hover:text-white">
                {ind + 1}.
              </p>
              <div>
                <h3 className="font-medium group-hover:text-white">
                  {rt.name}
                </h3>
                <p className="text-xs text-gray-700 leading-4 group-hover:text-gray-100 font-light">
                  By:{" "}
                  <span className="text-gray-900 font-normal group-hover:text-white text-sm">
                    {rt.publishedBy}
                  </span>
                </p>
              </div>
              <div className="flex items-center text-sm gap-2 group-hover:text-white ml-auto">
                <div className="flex items-center ">
                  <AiFillHeart />
                  <span>{rt.review.like}</span>
                </div>
                <div className="flex item-center">
                  <FaComment className="relative top-[3px]" size="14" />
                  <span>{rt.review.comment}</span>
                </div>
                <span>
                    <AiFillDelete size='18' />
                </span>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Bookmarks;
