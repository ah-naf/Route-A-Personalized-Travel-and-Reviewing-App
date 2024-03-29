import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Connection,
  ConnectionMode,
  Edge,
  Node,
  Panel,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";
import { v4 as uuidv4 } from "uuid";
import CreateRouteLeftbar from "../Compents/CreateRouteLeftBar/CreateRouteLeftbar";
import CreateRouteTopbar from "../Compents/CreateRouteTopbar/CreateRouteTopbar";
import SideToolBox from "../Compents/SideToolBox/SideToolBox";
import EndNode from "../Nodes/EndNode/EndNode";
import RouteNode from "../Nodes/RouteNode/RouteNode";
import StartNode from "../Nodes/StartNode/StartNode";
import UpdateNode from "../Nodes/UpdateNode/UpdateNode";
import VehicleNode from "../Nodes/VehicleNode/VehicleNode";
import { verifyUserThunk } from "../slices/AuthSlice";
import { RootState } from "../store";
import { calculateDate } from "../util";
import Controls from '../Compents/Controls/Controls'

const initialNodes = [
  {
    id: uuidv4(),
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
  routeNode: RouteNode,
  endNode: EndNode,
};

const initialEdges: Edge[] = [];

const getId = () => uuidv4();

const MyFlow = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null) as any;
  const selectedNode = useSelector(
    (state: RootState) => state.customNode.selectedNode
  );
  const auth = useSelector((state: RootState) => state.auth);
  const { setViewport } = useReactFlow();
  const location = useLocation();
  const paramId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  useEffect(() => {
    if (auth.status === "idle") dispatch(verifyUserThunk() as any);
    if (auth.status === "failed") window.location.href = "/";
  }, [auth.status]);

  const onConnect = useCallback(
    (params: Connection) => {
      console.log(params);
      setEdges((eds) => {
        const temp = {
          ...params,

          style: { strokeWidth: 1, stroke: "#000" },
        };
        return addEdge(temp, eds);
      });
    },
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (reactFlowWrapper && reactFlowWrapper.current) {
        const reactFlowBounds =
          reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData("application/reactflow");
        console.log(type);
        // check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });
        const typeData: { label: string; image: string; type: string } =
          JSON.parse(type);
        let newNode = {};

        // Node setting for vehicle node
        // if (type.type === "vehicleNode") {
        newNode = {
          id: getId(),
          type: typeData.type,
          position,
          data: { label: typeData.label, image: typeData.image },
        };
        // }

        setNodes((nds) => nds.concat(newNode as Node));
      }
    },
    [reactFlowInstance, setNodes]
  );

  useEffect(() => {
    const restoreFlow = async () => {
      const res = await fetch(`http://localhost:5000/api/route/${paramId}`, {
        credentials: "include",
      });
      const data = await res.json();
      // console.log(data);
      if (!data.route) {
        setNodes(initialNodes);
        setEdges([]);
        setViewport({ x: 0, y: 0, zoom: 1 });
        return;
      }
      const flow = data.route.flow;
      setTitle(data.route.title);
      setUpdatedAt(calculateDate(data.route.updateAt));
      console.log(data.route.title);
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
      setViewport({ x, y, zoom });
    };

    restoreFlow();
  }, [setNodes, setEdges, setViewport, paramId]);

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
        <CreateRouteTopbar
          reactFlowInstance={reactFlowInstance}
          paramId={paramId}
          tit={title}
          updateAt={updatedAt}
        />
        <Panel position="bottom-left">
          <Controls />
        </Panel>
        <Background
          color="grey"
          variant={"dots" as BackgroundVariant}
          gap={15}
          className="bg-slate-100"
        />
        {/* <Controls /> */}
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
