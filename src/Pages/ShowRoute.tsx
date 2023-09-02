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

import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import CreateRouteLeftbar from "../Compents/CreateRouteLeftBar/CreateRouteLeftbar";
import CreateRouteTopbar from "../Compents/CreateRouteTopbar/CreateRouteTopbar";
import Suggestions from "../Compents/Suggestions/Suggestions";
import UserReview from "../Compents/UserReview/UserReview";
import EndNode from "../Nodes/EndNode/EndNode";
import RouteNode from "../Nodes/RouteNode/RouteNode";
import StartNode from "../Nodes/StartNode/StartNode";
import VehicleNode from "../Nodes/VehicleNode/VehicleNode";
import ViewRouteNode from "../Nodes/ViewNode/ViewRouteNode";
import { getSingleRouteThunk } from "../slices/RouteSlice";
import { RootState } from "../store";

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
  const dispatch = useDispatch();
  const location = useLocation();
  const paramId = location.pathname.split("/")[2];
  const currentRoute = useSelector(
    (state: RootState) => state.route.activeRoute
  );

  useEffect(() => {
    if (currentRoute) {
      if (currentRoute.flow) {
        const flow = currentRoute.flow;
        if (flow) {
          const { x = 0, y = 0, zoom = 1 } = flow.viewport;
          setNodes(flow.nodes || []);
          setEdges(flow.edges || []);
          setViewport({ x, y, zoom });
        }
      }
    }
  }, [currentRoute, setNodes, setEdges, setViewport]);

  // TODO: Pore Backend tekhe data ana lagbe.
  useEffect(() => {
    dispatch(getSingleRouteThunk(paramId) as any);
  }, [paramId]);

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
        <CreateRouteTopbar reactFlowInstance={reactFlowInstance} type="show" />
        <Background
          color="grey"
          variant={"dots" as BackgroundVariant}
          gap={15}
          className="bg-slate-100"
        />
        <Controls />
        <UserReview />
        <Suggestions />
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
