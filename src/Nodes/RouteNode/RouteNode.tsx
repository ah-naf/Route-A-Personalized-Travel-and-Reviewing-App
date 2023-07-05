import { useDispatch } from "react-redux";
import { Handle, Node, Position, useReactFlow } from "reactflow";
import { setSelectedNode } from "../../slices/CustomNodeSlice";

function RouteNode({ id, data }) {
  const rflow = useReactFlow();
  const dispatch = useDispatch()

  const handleDoubleClick = () => {
    const { type } = rflow.getNode(id) as Node;
    dispatch(setSelectedNode({id, data, type}))
  }

  return (
    <div onDoubleClick={handleDoubleClick}>
      <Handle
        position={Position.Bottom}
        type="source"
        className="absolute h-5 bottom-0  translate-y-[17px] w-[1px] -translate-x-1/2 after:absolute after:w-3 after:h-3 after:-bottom-1 after:bg-black after:rounded-full after:translate-x-[-4.5px]"
      />
      <Handle
        position={Position.Top}
        type="target"
        className="absolute h-5 top-0 -translate-y-[17px] w-[1px] -translate-x-1/2 after:absolute after:w-3 after:h-3 after:-top-1 after:bg-black after:rounded-full after:translate-x-[-4.5px]"
      />
      <div className="flex bg-white border-2 border-black shadow-[6px_6px_0_1px_rgba(0,0,0,0.7)]">
        {!data.routeData ? (
          <div className="w-full h-full hover:bg-[#cadee7]">
            <div className="w-32 p-2 ">
              <img
                src="traveler.gif"
                className="w-28 h-28 object-contain mx-auto"
                alt=""
              />
              <p className="text-xs font-primary tracking-wider font-medium text-center">
                Double click to edit the node.
              </p>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default RouteNode;
