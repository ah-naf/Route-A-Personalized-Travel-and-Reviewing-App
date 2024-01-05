import { BigHead } from "@bigheads/core";
import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Compents/Navbar/Navbar";
import Rating from "../Compents/Rating/Rating";
import { getSinglePlaceReviewThunk } from "../slices/ReviewSlice";
import { RootState } from "../store";
import { calculateDate } from "../util";

function Place() {
  const dispatch = useDispatch();
  const location = useLocation();
  const paramId = location.pathname.split("/")[2];
  const { active_review: review } = useSelector(
    (state: RootState) => state.review
  );
  const [index, setIndex] = useState(0);
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSinglePlaceReviewThunk(paramId) as any);
  }, [paramId]);

  if (!review) return <div></div>;

  return (
    <div>
      <div className="bg-[whitesmoke]">
        <Navbar />
        <div className="pb-12 pt-8 px-8">
          <div className="max-w-3xl mx-auto">
            <div className="w-full">
              {review.contents[index].type === "video/mp4" ? (
                <video
                  src={review.contents[index].response}
                  className=" mx-auto"
                  controls
                  autoPlay={true}
                  loop
                ></video>
              ) : (
                <img src={review.contents[index].response} className="" />
              )}
              <div className="flex items-center justify-center gap-2 mt-2">
                <button
                  onClick={() => {
                    setIndex((index + 1) % review.contents.length);
                  }}
                >
                  <BiLeftArrowAlt
                    size="25"
                    className="text-gray-600 hover:text-black"
                  />
                </button>
                <button
                  onClick={() => {
                    setIndex(
                      (index - 1 + review.contents.length) %
                        review.contents.length
                    );
                  }}
                >
                  <BiRightArrowAlt
                    size="25"
                    className="text-gray-600 hover:text-black"
                  />
                </button>
              </div>
            </div>
            <div className="grid place-content-center mt-8">
              <h1 className="text-3xl text-center font-semibold tracking-wide">
                {review.title}
              </h1>
              <div className="grid place-items-center mt-2">
                <Rating size="2xl" value={review.rating} disabled />
              </div>
              <div className="flex items-center justify-center gap-2 mt-2">
                <div className="w-12 h-12">
                  <BigHead {...review.user?.avatar} />
                </div>
                <div>
                  <p className="font-medium text-blue-950 flex items-center gap-2">
                    {review.user?.name}{" "}
                    {user && user.id === review.userId && (
                      <span
                        className="cursor-pointer"
                        onClick={() =>
                          navigate(
                            `/place/new?routeid=${review.id}`
                          )
                        }
                      >
                        <AiFillEdit />
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-gray-600">
                    {calculateDate(review.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto my-12 px-6">
        <p dangerouslySetInnerHTML={{ __html: review.desc }} />
        <div className="flex items-center mt-4 gap-3 w-full flex-wrap">
          {review.tags.map((val, ind) => (
            <button
              className="p-2 bg-orange-400 text-white font-medium rounded"
              key={ind}
            >
              {val}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Place;
