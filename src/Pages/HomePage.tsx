import Navbar from "../Compents/Navbar/Navbar";
import SeachContainer from "../Compents/SearchContainer/SearchContainer";

function HomePage() {
  return (
    <div className="min-h-screen bg-[whitesmoke]">
      <Navbar />
      <div className="max-w-3xl text-center mx-auto mt-4 px-4">
        <h1 className="font-primary text-2xl sm:text-4xl md:text-5xl mb-2 font-bold tracking-wider text-blue-900">
          Discover the best route <br /> to enjoy your next trip.
        </h1>
        <p className="text-sm sm:text-lg font-secondary font-light text-slate-800">
          We always make our users happy by providing many choices.
        </p>

        <div className="flex justify-center p-4 relative">
          <img
            src="traveller.gif"
            className="w-56 sm:w-80 md:w-[inherit]"
            alt=""
          />
          <div className="bg-amber-400 rounded-lg w-20 h-20 md:w-24 md:h-24 rotate-12 z-10 items-center absolute p-3 top-1/2 -translate-y-1/2 md:-translate-x-1/2 left-0 shadow">
            <div className="absolute p-2 w-full h-full flex flex-col items-center justify-center bg-white shadow-2xl -top-6 -right-6 rounded-lg">
              <img
                src="beach.png"
                alt=""
                className="w-10 h-10 md:w-16  rounded-full shadow-lg"
              />
              <p className="text-xs mt-2 tracking-wide">Cox's Bazar</p>
            </div>
          </div>

          <div className="bg-gray-400 rounded-lg w-20 h-20 md:w-24 md:h-24 rotate-12  z-10 items-center absolute p-3 top-0 translate-y-1/2 lg:translate-y-full lg:translate-x-1/2 right-5 lg:right-0 shadow">
            <div className="absolute p-2 w-full h-full flex flex-col items-center justify-center bg-white shadow-2xl -top-6 -right-6 rounded-lg">
              <img
                src="mountain.png"
                alt=""
                className="w-10 h-10 md:w-16 rounded-full shadow-lg"
              />
              <p className="text-xs mt-2 tracking-wide">Bandarban</p>
            </div>
          </div>

          <div className="bg-[#24968b] rounded-lg w-20 h-20 md:w-24 md:h-24 -rotate-12  z-10 items-center absolute p-3 top-1/2 translate-y-12 lg:translate-x-full right-5 lg:right-0 shadow">
            <div className="absolute p-2 w-full h-full flex flex-col items-center justify-center bg-white shadow-2xl -top-6 -right-6 rounded-lg">
              <img
                src="tea.png"
                alt=""
                className="w-10 md:w-16 h-10 rounded-full shadow-lg"
              />
              <p className="text-xs mt-2 tracking-wide">Sylhet</p>
            </div>
          </div>
        </div>

        <SeachContainer />
      </div>
    </div>
  );
}

export default HomePage;
