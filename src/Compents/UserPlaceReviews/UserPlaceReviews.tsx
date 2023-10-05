import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePlaceReviewThunk,
  getAllPlaceReviewThunk,
} from "../../slices/ReviewSlice";
import { RootState } from "../../store";
import { PlaceReviewType, calculateDate } from "../../util";

function UserPlaceReviews() {
  const dispatch = useDispatch();
  const { reviews } = useSelector((state: RootState) => state.review);
  const { profileUser } = useSelector((state: RootState) => state.profile);
  const { user } = useSelector((state: RootState) => state.auth);
  const [placeReview, setPlaceReviews] = useState<PlaceReviewType[]>([]);

  useEffect(() => {
    dispatch(getAllPlaceReviewThunk() as any);
  }, []);

  useEffect(() => {
    if (reviews) {
      setPlaceReviews(reviews.filter((val) => val.userId === profileUser?.id));
    }
  }, [reviews, profileUser?.id]);

  return (
    <div className="px-3 pb-3 h-full max-h-full">
      <div className="border h-full p-2 py-3 mb-2 space-y-3">
        {placeReview.length > 0 ? (
          placeReview.map((rt, ind) => (
            <div
              key={rt.id}
              className="flex items-center bg-gray-100 p-3 rounded-md group hover:bg-orange-400 transition cursor-pointer shadow-sm"
            >
              <p className="text-2xl mr-4 font-semibold group-hover:text-white">
                {ind + 1}.
              </p>
              <div
                onClick={() => {
                  window.location.href = "/place/" + rt.id;
                }}
              >
                <h3 className="font-medium group-hover:text-white text-lg">
                  {rt.title}
                </h3>
                <p className="text-gray-700 font-normal group-hover:text-white text-sm">
                  {calculateDate(rt.updatedAt)}
                </p>
              </div>
              <div className="flex items-center text-sm gap-2 group-hover:text-white ml-auto">
                {user && user?.id === profileUser?.id && (
                  <button
                    className="border border-gray-700 rounded p-1 group-hover:border-white group-hover:bg-white"
                    onClick={() => {
                      dispatch(deletePlaceReviewThunk(rt.id as string) as any);
                      window.location.reload();
                    }}
                  >
                    <Trash2 className="w-4 h-4 group-hover:text-gray-700" />
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-xl font-medium text-center mt-2">
            No reviews added by the user
          </h1>
        )}
      </div>
    </div>
  );
}

export default UserPlaceReviews;
