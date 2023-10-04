import { Card } from "@nextui-org/react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Compents/Navbar/Navbar";
import SearchPageTop from "../Compents/SearchPageTop/SearchPageTop";
import { addBookmarkThunk, getAllRouteThunk } from "../slices/SearchSlice";
import { RootState } from "../store";
import { calculateDate } from "../util";

interface IsBookmarkedType {
  [key: string]: boolean; // Assuming isBookmarked is a boolean property
}

function SearchPage() {
  const dispatch = useDispatch();
  const routes = useSelector((state: RootState) => state.search.routes);
  const [isBookmarked, setIsBookmarked] = useState<IsBookmarkedType>({});
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    routes.forEach((rt) => {
      let temp = false;
      if (rt.bookmarks && user) {
        temp = rt.bookmarks.some(
          (val) => val.routeId === rt.id && val.userId === user.id
        );
      }
      setIsBookmarked((prev) => ({
        ...prev,
        [rt.id]: temp.valueOf(),
      }));
    });
  }, [routes]);

  useEffect(() => {
    dispatch(getAllRouteThunk() as any);
  }, []);

  const handleBookmark = (routeId: string) => {
    if (!user) {
      toast.error("Please sign in to bookmark");
      return;
    }
    dispatch(addBookmarkThunk({ routeId }) as any);
  };

  return (
    <>
      <Toaster />
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <SearchPageTop />
        <div className="mb-8 px-8">
          <p className="font-secondary text-3xl font-medium tracking-wide mb-4">
            Search Results
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-8">
            {routes.map((val, ind) => (
              <Card key={val.id} isHoverable>
                <Card.Body>
                  <div className="p-2">
                    <div className="flex w-full justify-between">
                      <div>
                        <h1 className="font-primary text-xl font-semibold tracking-wider">
                          {val.title}
                        </h1>
                        <p
                          className="text-sm tracking-wide text-gray-600"
                          title="Last Updated"
                        >
                          {calculateDate(val.updatedAt)}
                        </p>
                        <p className="tracking-wide text-sm mt-1 text-gray-800">
                          Added By:{" "}
                          <span
                            className="font-primary text-black font-medium hover:underline cursor-pointer"
                            onClick={() => {
                              window.location.href = "/profile/" + val.user?.id;
                            }}
                          >
                            {val.user?.username}
                          </span>
                        </p>
                      </div>
                      <div
                        className="mt-1 cursor-pointer"
                        onClick={() => handleBookmark(val.id)}
                      >
                        <span>
                          {!isBookmarked[val.id] ? (
                            <BsBookmarkHeart
                              size={30}
                              className="text-gray-600"
                            />
                          ) : (
                            <BsBookmarkHeartFill
                              size={30}
                              className="text-orange-400"
                            />
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card.Body>
                <Card.Footer>
                  <div className="flex items-center justify-between w-full p-2">
                    <div>
                      <div>
                        <p className="font-primary tracking-wider text-xs mb-1">
                          Starts from (Cost) :
                        </p>
                        <p className="font-secondary font-bold tracking-wide text-lg text-gray-800 leading-5">
                          {val.cost} Tk
                        </p>
                      </div>
                      <div className="mt-2">
                        <p className="font-primary tracking-wider text-xs mb-1">
                          Starts from (Time) :
                        </p>
                        <p className="font-secondary font-bold tracking-wide text-lg text-gray-800 leading-5">
                          {val.time} Minutes
                        </p>
                      </div>
                    </div>
                    <div>
                      <button
                        className="font-medium border-2 p-2 px-5 rounded-lg border-gray-300 hover:bg-orange-400 hover:border-orange-400 hover:text-white"
                        onClick={() => {
                          window.location.href = "/route/" + val.id;
                        }}
                      >
                        Explore
                      </button>
                    </div>
                  </div>
                </Card.Footer>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchPage;
