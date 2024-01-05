import { useCallback, useRef, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  ConnectionMode,
  Edge,
  MarkerType,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import CreateRouteLeftbar from "../Compents/CreateRouteLeftBar/CreateRouteLeftbar";
import CreateRouteTopbar from "../Compents/CreateRouteTopbar/CreateRouteTopbar";
import EdgeWithPlusIcon from "../Compents/EdgeWithPlusIcon/EdgeWithPlusIcon";
import StartNode from "../Nodes/StartNode/StartNode";
import VehicleNode from "../Nodes/VehicleNode/VehicleNode";

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
  vehicleNode: VehicleNode,
};

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", type: "edgeWithPlusIcon" },
];

const edgesType = {
  edgeWithPlusIcon: EdgeWithPlusIcon,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

export default function App() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null) as any;

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => {
        const temp = {
          ...params,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 15,
            height: 15,
            color: "#000",
          },
          style: { strokeWidth: 2, stroke: "#000" },
        };
        return addEdge(temp, eds);
      }),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      //   if(!reactFlowWrapper || !reactFlowWrapper.current) return;
      if (reactFlowWrapper && reactFlowWrapper.current) {
        const reactFlowBounds =
          reactFlowWrapper.current.getBoundingClientRect();
        let type = event.dataTransfer.getData("application/reactflow");

        // check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });
        type = JSON.parse(type);
        const newNode = {
          id: getId(),
          type: type.type,
          position,
          data: { label: type.label, image: type.image },
        };

        setNodes((nds) => nds.concat(newNode));
      }
    },
    [reactFlowInstance, setNodes]
  );

  return (
    <div className="flex">
      <CreateRouteLeftbar />
      <div className="w-screen h-screen  overflow-hidden">
        <CreateRouteTopbar />
        <ReactFlowProvider>
          <div className="w-full h-full flex relative" ref={reactFlowWrapper}>
            <Sidebar />
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              snapToGrid={true}
              edgeTypes={edgesType}
              nodeTypes={nodeTypes}
              connectionMode={ConnectionMode.Loose}
            >
              <Background
                color="grey"
                variant={"dots" as BackgroundVariant}
                gap={15}
                className="bg-slate-100"
              />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      </div>
    </div>
  );
}

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    const tempNodeType = {
      label: nodeType.name,
      image: nodeType.image,
      type: nodeType.type,
    };
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(tempNodeType)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="absolute text-black top-4 bg-white shadow rounded-lg left-4 z-20 border border-gray-100 max-w-sm ">
      <div className="border-b border-gray-300">
        <div className="p-4">
          <p className=" text-3xl font-primary font-semibold tracking-wider">
            Toolbox
          </p>
          <p className="mt-1 font-secondary text-gray-600">
            Click and drag a block to the canvas to build a route.
          </p>
        </div>
      </div>
      <div className="px-2 pb-4 max-h-96 overflow-auto"></div>
    </aside>
  );
};
