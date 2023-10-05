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
      className={`grid md:grid-cols-3 p-4 my-8 mx-4 md:mx-0 bg-white rounded shadow-[0_6px_15px_10px_rgba(0,0,0,0.05)] gap-4 `}
    >
      <div className="flex items-center w-full pt-3 pb-1">
        <p className="p-3 text-gray-700 border rounded border-gray-300">
          <FaPlaneDeparture size={25} />
        </p>
        <div className="text-left ml-3 font-secondary w-full">
          <Input
            rounded
            bordered
            fullWidth
            color="warning"
            labelPlaceholder="Source"
            helperText="Source Place. (Ex: Chittagong)"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center w-full pt-3 pb-1">
        <p className="p-3 text-gray-700 border rounded border-gray-300">
          <BiGlobeAlt size={25} />
        </p>
        <div className="text-left w-full ml-3 font-secondary">
          <Input
            rounded
            bordered
            color="warning"
            fullWidth
            labelPlaceholder="Destination"
            helperText="Destination Place. (Ex: Cox's Bazar)"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
      </div>
      <button
        className="bg-orange-400 mt-6 md:mt-0 py-3 px-6 min-w-max ml-4 rounded-md text-white text-lg font-primary font-bold tracking-wider"
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
  );
};

export default SeachContainer;
