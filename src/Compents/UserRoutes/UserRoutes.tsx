import { AiFillDelete, AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";

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
  return (
    <div className="px-3 pb-3 h-full">
      <div className="border h-full p-2 py-3 mb-2 space-y-3">
        {ROUTES.map((rt, ind) => (
          <div
            key={rt.id}
            className="flex items-center bg-gray-100 p-3 rounded-md group hover:bg-orange-400 transition cursor-pointer shadow-sm"
          >
            <p className="text-2xl mr-4 font-semibold group-hover:text-white">
              {ind + 1}.
            </p>
            <div>
              <h3 className="font-medium group-hover:text-white text-lg">
                {rt.name}
              </h3>
              <p className="text-gray-700 font-normal group-hover:text-white text-sm">
                {rt.publishedAt}
              </p>
            </div>
            <div className="flex items-center text-sm gap-3 group-hover:text-white ml-auto">
              <div className="flex items-center ">
                <AiFillHeart size='20' />
                <span>{rt.review.like}</span>
              </div>
              <div className="flex item-center">
                <FaComment className="relative top-[1px]" size="18" />
                <span>{rt.review.comment}</span>
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserRoutes;
