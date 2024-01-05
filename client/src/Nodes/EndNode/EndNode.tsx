import { Handle, Position } from "reactflow";

function EndNode() {
  return (
    <div className="bg-gray-50 w-32 h-32  grid place-content-center font-primary border-2 border-black font-bold tracking-wider text-xl border-1 shadow-[6px_6px_0_1px_rgba(0,0,0,0.7)]">
      <Handle
        type="target"
        position={Position.Top}
        className="absolute h-5 top-0 -translate-y-[17px] w-[1px] -translate-x-1/2 after:absolute after:w-3 after:h-3 after:-top-1 after:bg-black after:rounded-full after:translate-x-[-4.5px]"
      />
      <div className="w-full h-full p-1 py-2 text-center">
        <img
          src="/end.gif"
          className="w-[70%] object-contain object-center mx-auto"
          alt=""
        />
        <p className="text-xs font-primary my-1 font-medium tracking-wide">
          You reached your destination
        </p>
      </div>
    </div>
  );
}

export default EndNode;
