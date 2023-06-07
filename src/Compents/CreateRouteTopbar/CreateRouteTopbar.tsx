function CreateRouteTopbar() {
  return (
    <div className="flex items-center justify-between p-3 px-4 bg-white border-l-2 shadow">
      <div>
        <h1 className="font-primary font-bold tracking-wider text-xl">
          Cumilla to Chattogram
        </h1>
        <p className="font-secondary text-xs mt-2 text-gray-400">
          <span className="mr-2">Updated 09 Sep 2023</span>
          <span className="bg-orange-200 text-orange-800 font-[500] py-1 px-2 rounded">
            In progress
          </span>
        </p>
      </div>
      <div className="flex items-center gap-2 font-secondary text-[1rem]">
        <button className="p-1 px-3 border-2 rounded-md text-gray-800 border-gray-300 hover:text-black">Save as draft</button>
        <button className="p-1 px-3 border-2 rounded-md bg-black text-gray-100 hover:text-white">Publish</button>
      </div>
    </div>
  );
}

export default CreateRouteTopbar;
