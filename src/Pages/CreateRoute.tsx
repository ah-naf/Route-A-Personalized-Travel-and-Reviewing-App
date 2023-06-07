import { useCallback } from "react";
import ReactFlow, {
  ConnectionMode,
  Edge,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import CreateRouteLeftbar from "../Compents/CreateRouteLeftBar/CreateRouteLeftbar";
import CreateRouteTopbar from "../Compents/CreateRouteTopbar/CreateRouteTopbar";
import EdgeWithPlusIcon from "../Compents/EdgeWithPlusIcon/EdgeWithPlusIcon";
import StartNode from "../Compents/StartNode/StartNode";

const initialNodes = [
  {
    id: "1",
    position: {
      x: window.innerWidth / 2 - 50,
      y: window.innerHeight / 2 - 200,
    },
    data: { label: "start" },
    type: "startNode",
  },
  {
    id: "2",
    position: { x: window.innerWidth / 2 - 50, y: window.innerHeight / 2 },
    data: { label: "2" },
  },
];

const nodeTypes = {
  startNode: StartNode,
};

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", type: "edgeWithPlusIcon" },
];

const edgesType = {
  edgeWithPlusIcon: EdgeWithPlusIcon,
};

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
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          snapToGrid={true}
          edgeTypes={edgesType}
          nodeTypes={nodeTypes}
          connectionMode={ConnectionMode.Loose}
          fitView
        />
      </div>
    </div>
  );
}
