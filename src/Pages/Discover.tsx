import { BigHead } from "@bigheads/core";
import { FiArrowUpRight } from "react-icons/fi";
import Navbar from "../Compents/Navbar/Navbar";
import Search from "antd/es/input/Search";
import { SearchIcon } from "lucide-react";

const DISCOVER = [
  {
    id: "1",
    image: "",
    title: "Cumilla",
    publishedAt: "19 April 2023",
    username: "ahnaf",
  },
  {
    id: "2",
    image: "",
    title: "Chattogram",
    publishedAt: "19 April 2023",
    username: "ahnaf",
  },
];

function Discover() {
  return (
    <div className="">
      <Navbar />
      <div className="max-w-3xl mx-auto mt-10 grid">
        <h1 className="text-center text-6xl text-blue-900 font-semibold tracking-wide">
          Discover new places
        </h1>
        <div className="flex place-content-center mt-8">
          <input type="text" className="border p-2 rounded-l border-gray-400 focus:border-gray-600" placeholder="Input search text" />
          <button className="p-2 bg-orange-400 rounded-r">
            <SearchIcon className="h-5 w-5 text-white" />
          </button>
        </div>
        <div className="mt-12 space-y-2">
          {DISCOVER.map((place) => (
            <div
              key={place.id}
              className="flex w-full items-center gap-4 border-t border-gray-400 py-5"
            >
              <div className="h-24 w-32">
                <img
                  src="login-bg.png"
                  alt=""
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div>
                <h3 className="font-medium text-xl">{place.title}</h3>
                <p className="text-xs text-gray-600">{place.publishedAt}</p>
                <div className="flex items-center mt-1">
                  <div className="w-8 h-8">
                    <BigHead
                      accessory="shades"
                      body="breasts"
                      circleColor="blue"
                      clothing="vneck"
                      clothingColor="green"
                      eyebrows="leftLowered"
                      eyes="leftTwitch"
                      faceMask={false}
                      faceMaskColor="blue"
                      facialHair="none2"
                      graphic="vue"
                      hair="afro"
                      hairColor="blonde"
                      hat="turban"
                      hatColor="red"
                      lashes={false}
                      lipColor="red"
                      mask
                      mouth="serious"
                      skinTone="light"
                    />
                  </div>
                  <p className="text-sm text-gray-700 font-medium cursor-pointer hover:underline">
                    @{place.username}
                  </p>
                </div>
              </div>
              <div className="ml-auto">
                <button className="flex items-center text-gray-600 hover:underline hover:text-gray-900 font-medium">
                  Read more{" "}
                  <span className="ml-1">
                    <FiArrowUpRight size="20" />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Discover;
