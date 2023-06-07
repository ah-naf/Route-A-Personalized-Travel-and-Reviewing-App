import { Collapse } from "@nextui-org/react";
import { useCallback, useRef, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  ConnectionMode,
  Edge,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import CreateRouteLeftbar from "../Compents/CreateRouteLeftBar/CreateRouteLeftbar";
import CreateRouteTopbar from "../Compents/CreateRouteTopbar/CreateRouteTopbar";
import EdgeWithPlusIcon from "../Compents/EdgeWithPlusIcon/EdgeWithPlusIcon";
import StartNode from "../Compents/StartNode/StartNode";
import { VehicleType, vehicles } from "../util";

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

let id = 0;
const getId = () => `dndnode_${id++}`;

export default function App() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null) as any;

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
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
        console.log({ type });
        // check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });
        type = JSON.parse(type)
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
              fitView
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
    // console.log(event)
  };

  return (
    <aside className="absolute text-black top-1/2 bg-white shadow rounded-lg -translate-y-1/2 left-4 z-20 border border-gray-100 max-w-md">
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
      <div className="px-4 pb-4 max-h-96 overflow-auto">
        <Collapse.Group divider={false} splitted>
          <Collapse
            title={
              <p className="text-xl font-primary tracking-wide font-medium">
                Vehicle Nodes
              </p>
            }
          >
            <div className="grid grid-cols-3 gap-3 max-w-sm ">
              {vehicles.map((val: VehicleType, ind: number) => (
                <div
                  key={ind}
                  className="w-[100px] flex flex-col border p-2 px-3 items-center justify-center rounded-md shadow z-100"
                  onDragStart={(event) =>
                    onDragStart(event, { ...val, type: "vehicle" })
                  }
                  draggable
                >
                  <img src={val.image} alt="" className=" object-center" />
                  <p className="font-secondary tracking-wider text-gray-500 font-medium">
                    {val.name}
                  </p>
                </div>
              ))}
            </div>
          </Collapse>

          <Collapse
            expanded
            title={
              <p className="text-xl font-primary tracking-wide font-medium">
                Other Nodes
              </p>
            }
          >
            <div className="flex items-center">
              <div
                className="border w-20 h-20 grid place-content-center shadow font-medium text-gray-700 rounded-md"
                onDragStart={(event) =>
                  onDragStart(event, {
                    type: "other",
                    name: "New Node",
                    image: "",
                  })
                }
                draggable
              >
                New <br /> Node
              </div>
            </div>
          </Collapse>
        </Collapse.Group>
      </div>
      {/* <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, "input")}
        draggable
      >
        Input Node
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "default")}
        draggable
      >
        Default Node
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, "output")}
        draggable
      >
        Output Node
      </div> */}
    </aside>
  );
};
