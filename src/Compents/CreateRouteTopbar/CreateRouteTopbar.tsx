import { useCallback, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEdges, useNodes, useReactFlow } from "reactflow";
import { setLastUpdatedTime } from "../../slices/CustomNodeSlice";
import { postRouteThunk } from "../../slices/RouteSlice";
import { RootState } from "../../store";
import { FlowType, calculateDate } from "../../util";



function CreateRouteTopbar({ reactFlowInstance, type = "edit", paramId="" }) {
  const user = useSelector((state: RootState) => state.auth.user);
  const [title, setTitle] = useState("untitled");
  const dispatch = useDispatch();
  const lastUpdated = useSelector(
    (state: RootState) => state.customNode.lastUpdated
  );
  const node = useNodes();
  const edge = useEdges();
  const rflow = useReactFlow();
  const activeRoute = useSelector((state: RootState) => state.route.activeRoute)
  const isLoading = useSelector((state: RootState) => state.route.loading);
  const [mode, setMode] = useState("draft");

  useEffect(() => {
    if(type === 'show' && activeRoute) {
      setTitle(activeRoute.title)
      dispatch(setLastUpdatedTime(activeRoute.updatedAt));
    }
  }, [type, activeRoute])

  useEffect(() => {
    const tempFlow = localStorage.getItem("current_flow");
    if (tempFlow) {
      const flow = JSON.parse(tempFlow);
      if (flow && Object.keys(flow).length > 0) {
        const time = flow.lastUpdated;
        dispatch(setLastUpdatedTime(time));
      }
    }
  }, [dispatch]);

  

  const onSave = useCallback(
    (published: boolean) => {
      if (reactFlowInstance) {
        const flow: FlowType = reactFlowInstance.toObject();
        
        if (!user || !user.id) {
          toast.error("Something wrong happend.");
          return;
        }

        const formattedDate = calculateDate();
        dispatch(setLastUpdatedTime(formattedDate));

        if (published) setMode("published");

        const toSave = {
          id: paramId,
          flow,
          userId: user.id,
          published,
          title,
        };
        dispatch(postRouteThunk({ ...toSave }) as any);
        // TODO: Delete it after connecting to db
        localStorage.setItem("current_flow", JSON.stringify({ ...flow }));
      }
    },
    [reactFlowInstance, dispatch, title, user]
  );

  // Calculate Minimum time/cost
  const handleRouteOption = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const adjacencyList = new Map();
    let edgePathMap; // To store the edge path and its corresponding cost.
    let maxVal = Infinity;
    const addNode = (nd: string) => adjacencyList.set(nd, []);
    const edgeAdd = (origin: string, dest: string, edgeId: string) => {
      adjacencyList.get(origin).push({ dest, edgeId });
    };

    const dfs = (
      start: string,
      type: string,
      visited = new Set(),
      cost = 0,
      path: string[] = []
    ) => {
      if (rflow.getNode(start)?.type === "endNode") {
        if (cost < maxVal) {
          maxVal = cost;
          edgePathMap = path;
        }
        return;
      }

      visited.add(start);

      const destList = adjacencyList.get(start);
      for (const { dest, edgeId } of destList) {
        if (!visited.has(dest)) {
          let num = 0;
          const curNode = rflow.getNode(dest);
          if (curNode?.type === "vehicleNode") {
            if (type === "cost") {
              num += curNode?.data.cost;
            } else {
              if (curNode.data.time_unit === "days") {
                num = curNode.data.time * 24 * 60;
              } else if (curNode.data.time_unit === "hours") {
                num = curNode.data.time * 60;
              } else num = curNode.data.time;
            }
          }

          dfs(dest, type, visited, cost + num, [...path, edgeId]);
        }
      }

      visited.delete(start);
    };

    node.forEach((val) => addNode(val.id));
    edge.forEach((val) => edgeAdd(val.source, val.target, val.id));

    const start = node.find((val) => val.type === "startNode")?.id;

    if (start) {
      if (evt.target.value !== "default") dfs(start, evt.target.value);
      const edgeSet = new Set(edgePathMap);

      const temp = rflow.getEdges().map((e) => {
        if (edgeSet.has(e.id)) {
          return {
            ...e,
            style: { strokeWidth: 5, stroke: "orange" },

            animated: true,
          };
        }
        return {
          ...e,
          style: { strokeWidth: 1, stroke: "#000" },
          animated: false,
        };
      });
      rflow.setEdges(temp);
    }
  };

  return (
    <div className="absolute top-0 w-full z-[100] flex items-center justify-between p-3 px-4 bg-white border-l-2 shadow">
      <Toaster />
      <div>
        <input
          type="text"
          className="font-primary font-bold tracking-wider text-xl border-none outline-none"
          placeholder="Enter title"
          value={title}
          disabled={type === "show"}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <p className="font-secondary text-xs mt-2 text-gray-400">
          {lastUpdated && (
            <span className="mr-2">
              Last {type === "show" ? "updated" : "saved"} {lastUpdated}
            </span>
          )}
          <span
            className={`${
              type === "show" || mode === "published"
                ? "bg-green-300 text-green-800"
                : "bg-orange-200 text-orange-800"
            } font-[500] py-1 px-2 rounded`}
          >
            {type === "show" || mode === "published"
              ? "Published"
              : "In progress"}
          </span>
        </p>
      </div>

      <div className="ml-auto mr-4">
        <label htmlFor="route_option" className="mr-1 font-medium">
          Route Options:{" "}
        </label>
        <select
          name="route_option"
          className="p-2 rounded bg-transparent border-2 border-gray-700"
          id="route_option"
          onChange={handleRouteOption}
        >
          <option value="default">Default</option>
          <option value="cost">Minimum Cost</option>
          <option value="time">Minimum Time</option>
        </select>
      </div>
      {type === "edit" && (
        <div className=" flex items-center gap-2 font-secondary text-[1rem]">
          <button
            className="p-1 px-3 border-2 rounded-md text-gray-800 border-gray-300 hover:text-black"
            onClick={() => onSave(false)}
            disabled={isLoading}
          >
            Save as draft
          </button>
          <button
            className="p-1 px-3 border-2 rounded-md bg-black text-gray-100 hover:text-white"
            onClick={() => onSave(true)}
            disabled={isLoading}
          >
            Publish
          </button>
        </div>
      )}
    </div>
  );
}

export default CreateRouteTopbar;
