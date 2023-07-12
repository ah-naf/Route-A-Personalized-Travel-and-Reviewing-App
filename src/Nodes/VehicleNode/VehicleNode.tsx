import { useDispatch } from "react-redux";
import { Handle, Node, Position, useReactFlow } from "reactflow";
import { setSelectedNode } from "../../slices/CustomNodeSlice";

function VehicleNode({ id, data }) {
  const rflow = useReactFlow();
  const dispatch = useDispatch();

  const handleDoubleClick = () => {
    const { type } = rflow.getNode(id) as Node;
    // const tempData = { ...data, cost: "", time: "" };

    dispatch(setSelectedNode({ id, data, type, editMode: true }));
  };

  return (
    <div className="" onDoubleClick={handleDoubleClick}>
      <Handle
        position={Position.Bottom}
        type="source"
        className="absolute h-5 bottom-0 translate-y-[17px] w-[1px] -translate-x-1/2 after:absolute after:w-3 after:h-3 after:-bottom-1 after:bg-black after:rounded-full after:translate-x-[-4.5px]"
      />
      <Handle
        position={Position.Top}
        type="target"
        className="absolute h-5 top-0 -translate-y-[17px] w-[1px] -translate-x-1/2 after:absolute after:w-3 after:h-3 after:-top-1 after:bg-black after:rounded-full after:translate-x-[-4.5px]"
      />
      <div className=" flex flex-col justify-center items-center bg-white border-2 border-black p-1 pb-4 px-2 shadow-[6px_6px_0_1px_rgba(0,0,0,0.7)]">
        {data.image && (
          <img
            src={data.image}
            alt=""
            className="w-16 h-16 object-contain object-center"
          />
        )}
        <div className="mt-2 px-1">
          {data.label && (
            <p className="text-sm leading-[9px] font-medium tracking-wider">
              Vehicle: <span className="font-light">{data.label}</span>
            </p>
          )}
          {data.cost && (
            <p className="text-sm leading-[9px] font-medium tracking-wider my-2">
              Cost: <span className="font-light">{data.cost} Taka</span>
            </p>
          )}
          {data.time && (
            <p className="text-sm leading-[9px] font-medium tracking-wider">
              Time:{" "}
              <span className="font-light">
                {data.time} {data.time_unit}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default VehicleNode;
