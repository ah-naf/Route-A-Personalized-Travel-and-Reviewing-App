import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  const [searchParams] = useSearchParams();
  const [source, setSource] = useState<null | undefined | string>();
  const [destination, setDestination] = useState<null | undefined | string>();
  const navigate = useNavigate();

  useEffect(() => {
    setSource(searchParams.get("source"));
    setDestination(searchParams.get("destination"));
  }, [searchParams]);

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
    dispatch(getAllRouteThunk({ source, destination }) as any);
  }, [source, destination]);

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
      <div className="max-w-7xl mx-auto min-h-screen">
        <SearchPageTop />
        <div className="mb-8 px-8">
          <p className="font-secondary text-3xl font-medium tracking-wide mb-4">
            Search Results{" "}
            {source && destination && (
              <span
                className="text-xs font-light text-red-500 cursor-pointer hover:underline"
                onClick={() => navigate("/search")}
              >
                reset
              </span>
            )}
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-8">
            {routes && routes.length > 0 ? (
              routes.map((val) => (
                <Card key={val.id} isHoverable>
                  <CardBody>
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
                                window.location.href =
                                  "/profile/" + val.user?.id;
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
                  </CardBody>
                  <CardFooter>
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
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="grid col-span-5 place-content-center relative">
                <img src="404.png" alt="" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchPage;
