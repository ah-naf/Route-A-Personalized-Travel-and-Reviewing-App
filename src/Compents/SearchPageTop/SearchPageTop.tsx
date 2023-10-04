import { useEffect, useState } from "react";
import { SeachContainer } from "../../Pages/HomePage";
import Weather from "../Weather/Weather";

function SearchPageTop() {
  const [date] = useState({
    day: new Date().toLocaleDateString("en-US", { weekday: "long" }),
    year: new Date().getFullYear(),
    date: new Date().getDate(),
    month: new Date().toLocaleDateString("en-US", { month: "long" }),
  });

  return (
    <>
      <div className="my-10 flex flex-col lg:flex-row items-center justify-center gap-8 px-6">
        <div className="grid place-items-center sm:grid-cols-2 sm:place-content-center w-full gap-8 sm:gap-4 lg:grid-cols-1">
          <div className="flex items-start gap-2">
            <h3 className="text-6xl font-primary text-gray-600 leading-10 font-medium">
              {date.date}
            </h3>
            <div className="font-primary">
              <h4 className="font-semibold tracking-wide">{date.day}</h4>
              <p className="text-gray-600 leading-5 font-primary tracking-wider flex items-center gap-1">
                <span>{date.month}</span>, <span>{date.year}</span>
              </p>
            </div>
          </div>
          <div className="hidden max-2xl:flex">
            <Weather />
          </div>
        </div>
        <div className="relative -top-8 lg:top-0 lg:min-w-[720px]">
          <SeachContainer page="search" />
        </div>
        <div className="hidden 2xl:flex">
          <Weather />
        </div>
      </div>
    </>
  );
}

export default SearchPageTop;


