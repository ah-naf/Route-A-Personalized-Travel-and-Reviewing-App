import { BigHead } from "@bigheads/core";
import { useEffect, useState } from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Navbar from "../Compents/Navbar/Navbar";
import { getSinglePlaceReviewThunk } from "../slices/ReviewSlice";
import { RootState } from "../store";

function Review() {
  const dispatch = useDispatch();
  const location = useLocation();
  const paramId = location.pathname.split("/")[2];
  const { active_review: review } = useSelector(
    (state: RootState) => state.review
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    dispatch(getSinglePlaceReviewThunk(paramId) as any);
  }, [paramId]);

  return (
    <div>
      <Navbar />
      {review && (
        <div className="max-w-4xl mx-auto p-4 grid place-content-center">
          <h1 className="text-4xl font-semibold tracking-wide text-center">
            {review.title}
          </h1>
          <div className="flex items-center justify-center my-4">
            <p className="text-sm text-gray-700">Posted By:</p>
            <div className="w-10 h-10 relative -top-1.5">
              <BigHead {...review.user?.avatar} />
            </div>
            <p className="text-sm hover:underline cursor-pointer">
              @{review.user?.username}
            </p>
          </div>
          <div className="w-full">
            {review.contents[index].type === "video/mp4" ? (
              <video
                src={review.contents[index].url}
                className="h-[450px] mx-auto"
                controls
                autoPlay={true}
                loop
              ></video>
            ) : (
              <img src={review.contents[index].url} className="h-[450px]" />
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
          <div className="my-8 max-w-3xl mx-auto">
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
      )}
    </div>
  );
}

export default Review;
