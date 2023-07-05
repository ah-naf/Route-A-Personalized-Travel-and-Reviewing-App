import { useEffect, useState } from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
  useEdges,
  useNodes,
  useReactFlow,
} from "reactflow";

const EdgeWithPlusIcon = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
}: EdgeProps) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const edge = useEdges();
  const nn = useNodes();
  const rr = useReactFlow();
  const [label, setLabel] = useState("");

  useEffect(() => {
    const temp = edge.filter((val) => val.id === id)[0];

    if (temp && temp.label) {
      setLabel(temp.label as string);
    }
  }, [edge, id, nn]);

  const onEdgeClick = (e, id) => {
    e.stopPropagation();
    // const edges = rr.getEdges().map((val) => {
    //   if (val.id === id) {
    //     return { ...val, label: "LOL" };
    //   }
    //   return val;
    // });

    // rr.setEdges(edges);
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            // everything inside EdgeLabelRenderer has no pointer events by default
            // if you have an interactive element, set pointer-events: all
            pointerEvents: "all",
          }}
          className=""
        >
          {!label ? (
            <button
              className="bg-emerald-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow hover:bg-emerald-600"
              onClick={(event) => onEdgeClick(event, id)}
            >
              +
            </button>
          ) : (
            <button
              onDoubleClick={(e) => console.log("first")}
              className="bg-green-500 text-white py-1 px-3 shadow text-sm font-primary tracking-wider font-semibold rounded-lg"
            >
              Lol
            </button>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default EdgeWithPlusIcon;
