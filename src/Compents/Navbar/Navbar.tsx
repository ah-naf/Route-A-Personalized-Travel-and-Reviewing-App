function Navbar() {
  return (
    <div className="flex items-center justify-between p-6 lg:px-10 sticky top-0 bg-transparent backdrop-blur-md font-secondary font-[500]">
      <h1 className="text-3xl tracking-wider">
        <span className="text-orange-300">r</span>ou
        <span className="text-sky-400">te</span>
      </h1>
      <div className="flex items-center gap-4 text-sm">
        <button className="hover:underline">Discover</button>
        <button className="hover:underline">About Us</button>
        <button className="hover:underline">Explore</button>
        <button className="hover:underline">Sign in</button>
        <button className="bg-orange-400 p-3 px-5 text-white rounded">
          Register
        </button>
      </div>
    </div>
  );
}

export default Navbar;
