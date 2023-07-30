import { useEffect, useRef, useState } from "react";
import {
  Background,
  BackgroundVariant,
  ConnectionMode,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";

import { useSelector } from "react-redux";
import CreateRouteLeftbar from "../Compents/CreateRouteLeftBar/CreateRouteLeftbar";
import CreateRouteTopbar from "../Compents/CreateRouteTopbar/CreateRouteTopbar";
import EndNode from "../Nodes/EndNode/EndNode";
import RouteNode from "../Nodes/RouteNode/RouteNode";
import StartNode from "../Nodes/StartNode/StartNode";
import VehicleNode from "../Nodes/VehicleNode/VehicleNode";
import ViewRouteNode from "../Nodes/ViewNode/ViewRouteNode";
import { RootState } from "../store";
import UserReview from "../Compents/UserReview/UserReview";

const nodeTypes = {
  startNode: StartNode,
  vehicleNode: VehicleNode,
  routeNode: RouteNode,
  endNode: EndNode,
};

const MyFlow = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null) as any;
  const { setViewport } = useReactFlow();
  const selectedNode = useSelector(
    (state: RootState) => state.customNode.selectedNode
  );

  // TODO: Pore Backend tekhe data ana lagbe.
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
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        //   onConnect={onConnect}
        onInit={setReactFlowInstance}
        nodesDraggable={false}
        snapToGrid={true}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
      >
        <CreateRouteTopbar reactFlowInstance={reactFlowInstance} type='show' />
        <Background
          color="grey"
          variant={"dots" as BackgroundVariant}
          gap={15}
          className="bg-slate-100"
        />
        <Controls />
        <UserReview />
        {Object.keys(selectedNode).length > 0 && <ViewRouteNode />}
      </ReactFlow>
    </div>
  );
};

function ShowRoute() {
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

export default ShowRoute;
