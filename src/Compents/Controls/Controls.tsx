import { useEffect } from "react";
import { BiZoomIn, BiZoomOut } from "react-icons/bi";
import { MdOutlineZoomInMap } from "react-icons/md";
import { ReactFlowInstance, useReactFlow, useViewport } from "reactflow";

function Controls() {
  const rflow: ReactFlowInstance = useReactFlow();
  const { zoom } = useViewport();

  useEffect(() => {
    // console.log(zoom);
  }, [zoom]);

  return (
    <div className="bg-gray-300/40 rounded-lg px-2 py-1 flex items-center text-gray-700/90 group">
      <BiZoomIn
        size={22}
        className="hover:text-gray-950 cursor-pointer"
        onClick={() => rflow.zoomIn()}
      />

      <span className="text w-0 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:w-16 group-hover:mx-1 transition-all">
        {(rflow.getZoom() * 100).toFixed(2)}%
      </span>
      <BiZoomOut
        onClick={() => rflow.zoomOut()}
        size={22}
        className="hover:text-gray-950 cursor-pointer"
      />
      <MdOutlineZoomInMap
        onClick={() => rflow.fitView()}
        size={22}
        className="ml-1 hover:text-gray-950 cursor-pointer"
      />
    </div>
  );
}

export default Controls;
