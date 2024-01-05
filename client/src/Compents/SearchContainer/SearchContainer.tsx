import { Input } from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiGlobeAlt } from "react-icons/bi";
import { FaPlaneDeparture } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SeachContainer = () => {
  const navigate = useNavigate();
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  return (
    <div
      className={`grid md:grid-cols-3 p-4 pb-1 pt-5 my-8 mx-auto  max-w-2xl bg-white rounded shadow-[0_6px_15px_10px_rgba(0,0,0,0.05)] gap-4 `}
    >
      <div className="flex items-center w-full  pb-1">
        <p className="p-2 text-gray-700 border rounded border-gray-300">
          <FaPlaneDeparture size={18} />
        </p>
        <div className="text-left ml-3 font-secondary w-full">
          <Input
            size="md"
            radius="md"
            variant="bordered"
            fullWidth
            className="!mt-0"
            color="warning"
            labelPlacement="outside"
            label="Source Place"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center w-full pb-1">
        <p className="p-2 text-gray-700 border rounded border-gray-300">
          <BiGlobeAlt size={18} />
        </p>
        <div className="text-left w-full ml-3 font-secondary">
          <Input
            size="md"
            radius="md"
            color="warning"
            fullWidth
            className="!mt-0"
            variant="bordered"
            labelPlacement="outside"
            label="Destination Place"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
      </div>
      <div className="flex content-stretch p-3 items-center">
        <button
          className="bg-orange-400 h-full py-3 px-6 rounded-md w-full text-white text-md font-primary font-bold tracking-wider"
          onClick={() => {
            if (!source || !destination) {
              toast.error("Missing required field value");
              return;
            }
            navigate(`/search?source=${source}&&destination=${destination}`);
          }}
        >
          Find Route
        </button>
      </div>
    </div>
  );
};

export default SeachContainer;
