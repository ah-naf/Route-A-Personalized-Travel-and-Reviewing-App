import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ReactFlow, {
  Background,
  BackgroundVariant,
  ConnectionMode,
  Controls,
  Edge,
  MarkerType,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";
import CreateRouteLeftbar from "../Compents/CreateRouteLeftBar/CreateRouteLeftbar";
import CreateRouteTopbar from "../Compents/CreateRouteTopbar/CreateRouteTopbar";
import SideToolBox from "../Compents/SideToolBox/SideToolBox";
import StartNode from "../Nodes/StartNode/StartNode";
import UpdateNode from "../Nodes/UpdateNode/UpdateNode";
import VehicleNode from "../Nodes/VehicleNode/VehicleNode";
import { RootState } from "../store";
import RouteNode from "../Nodes/RouteNode/RouteNode";

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
];

const nodeTypes = {
  startNode: StartNode,
  vehicleNode: VehicleNode,
  routeNode: RouteNode
};

const initialEdges: Edge[] = [];

let id = 0;
const getId = () => `dndnode_${id++}`;

const MyFlow = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null) as any;
  const selectedNode = useSelector(
    (state: RootState) => state.customNode.selectedNode
  );
  const { setViewport } = useReactFlow();

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
        let newNode = {};

        // Node setting for vehicle node
        // if (type.type === "vehicleNode") {
        newNode = {
          id: getId(),
          type: type.type,
          position,
          data: { label: type.label, image: type.image },
        };
        // }

        setNodes((nds) => nds.concat(newNode));
      }
    },
    [reactFlowInstance, setNodes]
  );

  useEffect(() => {
    const restoreFlow = async () => {
      const tempFlow = localStorage.getItem("current_flow");
      if (tempFlow) {
        const flow = JSON.parse(tempFlow);
        if (flow) {
          const { x = 0, y = 0, zoom = 1 } = flow.viewport;
          setNodes(flow.nodes || []);
          setEdges(flow.edges || []);
          setViewport({ x, y, zoom });
        }
      }
    };

    restoreFlow();
  }, [setNodes, setEdges, setViewport]);

  return (
    <div className="w-full h-full flex relative" ref={reactFlowWrapper}>
      <SideToolBox />
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
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
      >
        <CreateRouteTopbar reactFlowInstance={reactFlowInstance} />
        <Background
          color="grey"
          variant={"dots" as BackgroundVariant}
          gap={15}
          className="bg-slate-100"
        />
        <Controls />
        {/* Change Condition */}
        {Object.keys(selectedNode).length > 0 && <UpdateNode />}
      </ReactFlow>
    </div>
  );
};

export default function App() {
  return (
    <div className="flex">
      <CreateRouteLeftbar />
      <div className="w-screen h-screen  overflow-hidden">
        <ReactFlowProvider>
          <MyFlow />
        </ReactFlowProvider>
      </div>
    </div>
  );
}
