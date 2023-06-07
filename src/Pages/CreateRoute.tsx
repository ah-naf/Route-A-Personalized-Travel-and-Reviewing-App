import { useCallback } from "react";
import ReactFlow, { addEdge, useEdgesState, useNodesState } from "reactflow";
import CreateRouteLeftbar from "../Compents/CreateRouteLeftBar/CreateRouteLeftbar";
import StartNode from "../Compents/StartNode/StartNode";
import CreateRouteTopbar from "../Compents/CreateRouteTopbar/CreateRouteTopbar";

const initialNodes = [
  {
    id: "1",
    position: { x: 100, y: 0 },
    data: { label: "start" },
    type: "startNode",
  },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];

const nodeTypes = {
  startNode: StartNode,
};

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="flex">
      <CreateRouteLeftbar />
      <div className="w-screen h-screen bg-slate-100 overflow-hidden">
        <CreateRouteTopbar />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        />
      </div>
    </div>
  );
}
