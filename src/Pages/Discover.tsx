import { BigHead } from "@bigheads/core";
import { Card } from "@nextui-org/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Compents/Navbar/Navbar";
import Rating from "../Compents/Rating/Rating";
import SearchInput from "../Compents/SearchInput/SearchInput";
import { getAllPlaceReviewThunk } from "../slices/ReviewSlice";
import { RootState } from "../store";

function Discover() {
  const dispatch = useDispatch();
  const { filtered_reviews } = useSelector((state: RootState) => state.review);

  useEffect(() => {
    dispatch(getAllPlaceReviewThunk() as any);
  }, []);

  return (
    <div className="">
      <Navbar />
      <div className="max-w-4xl mx-auto mt-10 grid">
        <h1 className="text-center text-6xl text-blue-900 font-semibold tracking-wide">
          Discover new places
        </h1>
        <div className="flex place-content-center mt-8">
          <SearchInput />
        </div>
        <div className="mt-12 space-y-2">
          {filtered_reviews.length ? (
            <div className="grid grid-cols-3 gap-4">
              {filtered_reviews.map((place) => (
                <div key={place.id} className="!h-[400px]">
                  <Card
                    isPressable
                    onClick={() => {
                      window.location.href = "/review/" + place.id;
                    }}
                  >
                    <Card.Body>
                      <Card.Image
                        src={place.cover_pic}
                        width="100%"
                        objectFit="cover"
                        height={"200px"}
                      ></Card.Image>
                    </Card.Body>
                    <Card.Footer>
                      <div>
                        <h1 className="text-xl font-medium">{place.title}</h1>
                        <div className="flex items-center gap-2">
                          <Rating size="lg" disabled value={place.rating} />
                          <span className="font-medium relative -top-1">
                            ({place.rating})
                          </span>
                        </div>

                        <div className="flex items-center">
                          <p className="font-medium">Posted by: </p>
                          <div className="w-10 h-10 relative -top-1.5">
                            <BigHead {...place.user?.avatar} />
                          </div>
                          <p className="text-gray-700">
                            @{place.user?.username}
                          </p>
                        </div>

                        <div className="space-x-2 my-3">
                          {place.tags.map((val, ind) => {
                            if (ind < 3)
                              return (
                                <span className="bg-orange-400  text-white text-sm p-2 rounded">
                                  {val}
                                </span>
                              );
                          })}
                          {place.tags.length > 3 && (
                            <span className="font-medium text-xs">
                              and more
                            </span>
                          )}
                        </div>
                      </div>
                    </Card.Footer>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid place-content-center relative">
              <img src="404.png" alt="" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Discover;
