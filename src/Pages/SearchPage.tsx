import { Card } from "@nextui-org/react";
import { BsBookmarkHeart } from "react-icons/bs";
import Navbar from "../Compents/Navbar/Navbar";
import SearchPageTop from "../Compents/SearchPageTop/SearchPageTop";
const DATA = [
  {
    place: "Chittagong to Cumilla",
    last_updated: "02 May 2023",
    postedBy: "ahnaf",
    image:
      "https://media.cntraveler.com/photos/643d5d0a5722b1af03793a06/16:9/w_2560%2Cc_limit/Dal%2520Lake_GettyImages-1323846766.jpg",
    price: {
      max: 2000,
      min: 850,
    },
    time: {
      max: 2,
      min: 1,
    },
  },
  {
    place: "Chittagong to Cumilla",
    last_updated: "02 May 2023",
    postedBy: "ahnaf",
    image:
      "https://media.cntraveler.com/photos/643d5d0a5722b1af03793a06/16:9/w_2560%2Cc_limit/Dal%2520Lake_GettyImages-1323846766.jpg",
    price: {
      max: 2000,
      min: 850,
    },
    time: {
      max: 2,
      min: 1,
    },
  },
  {
    place: "Chittagong to Cumilla",
    last_updated: "02 May 2023",
    postedBy: "ahnaf",
    image:
      "https://media.cntraveler.com/photos/643d5d0a5722b1af03793a06/16:9/w_2560%2Cc_limit/Dal%2520Lake_GettyImages-1323846766.jpg",
    price: {
      max: 2000,
      min: 850,
    },
    time: {
      max: 2,
      min: 1,
    },
  },
  {
    place: "Chittagong to Cumilla",
    last_updated: "02 May 2023",
    postedBy: "ahnaf",
    image:
      "https://media.cntraveler.com/photos/643d5d0a5722b1af03793a06/16:9/w_2560%2Cc_limit/Dal%2520Lake_GettyImages-1323846766.jpg",
    price: {
      max: 2000,
      min: 850,
    },
    time: {
      max: 2,
      min: 1,
    },
  },
];

function SearchPage() {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <SearchPageTop />
        <div className="mt-16 ">
          <p className="font-secondary text-2xl font-medium tracking-wide mb-4">Search Results</p>
          <div className="grid grid-cols-4 gap-8">
            {DATA.map((val, ind) => (
              <Card key={ind} isPressable isHoverable>
                <Card.Body>
                  <div className="p-2">
                    <div className="flex w-full justify-between">
                      <div>
                        <h1 className="font-primary text-xl font-semibold tracking-wider">
                          {val.place}
                        </h1>
                        <p
                          className="text-sm tracking-wide text-gray-600"
                          title="Last Updated"
                        >
                          {val.last_updated}
                        </p>
                        <p className="tracking-wide text-sm mt-1 text-gray-800">
                          Added By:{" "}
                          <span className="font-primary text-lg text-black font-medium hover:underline">
                            {val.postedBy}
                          </span>
                        </p>
                      </div>
                      <div className="mt-1">
                        <span>
                          <BsBookmarkHeart
                            size={30}
                            className="text-gray-600"
                          />
                          {/* <BsBookmarkHeartFill size={30} className="text-orange-400" /> */}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 rounded-lg">
                      <img src={val.image} alt="" className="rounded-lg" />
                    </div>
                  </div>
                </Card.Body>
                <Card.Footer>
                  <div className="flex items-center justify-between w-full p-2">
                    <div>
                      <div>
                        <p className="font-primary tracking-wider text-sm mb-1">
                          Total Price :
                        </p>
                        <p className="font-secondary font-bold tracking-wide text-lg text-gray-800 leading-5">
                          {val.price.min} - {val.price.max} Tk
                        </p>
                      </div>
                      <div className="mt-2">
                        <p className="font-primary tracking-wider text-sm mb-1">
                          Time Needed :
                        </p>
                        <p className="font-secondary font-bold tracking-wide text-lg text-gray-800 leading-5">
                          {val.time.min} - {val.time.max} Hours
                        </p>
                      </div>
                    </div>
                    <div>
                      <button className="font-medium border-2 p-2 px-5 rounded-lg border-gray-300 hover:bg-orange-400 hover:border-orange-400 hover:text-white">
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
