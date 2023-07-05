import { Handle, Position } from "reactflow";

function StartNode() {
  return (
    <div className="bg-gray-50 w-24 h-24  grid place-content-center font-primary border-2 border-black font-bold tracking-wider text-xl border-1 shadow-[6px_6px_0_1px_rgba(0,0,0,0.7)]">
      <Handle type="source" position={Position.Bottom} />
      <div className="w-full h-full p-1 flex items-center text-center relative">
        <img
          src="start.gif"
          className="w-[80%] object-contain object-center mx-auto"
          alt=""
        />
        <p className="absolute right-0 top-1/2 translate-y-2 -translate-x-1/2 tracking-widest font-semibold text-sm font-primary">Start</p>
      </div>
    </div>
  );
}

export default StartNode;
