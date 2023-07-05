import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLastUpdatedTime } from "../../slices/CustomNodeSlice";
import { RootState } from "../../store";

const MONTH = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function CreateRouteTopbar({ reactFlowInstance }) {
  const [title, setTitle] = useState("untitled");
  const dispatch = useDispatch();
  const lastUpdated = useSelector(
    (state: RootState) => state.customNode.lastUpdated
  );

  useEffect(() => {
    const tempFlow = localStorage.getItem("current_flow");
    if (tempFlow) {
      const flow = JSON.parse(tempFlow);
      if(flow && Object.keys(flow).length > 0) {
        const time = flow.lastUpdated
        dispatch(setLastUpdatedTime(time))
      }
    }
  }, [dispatch]);

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();

      const currentDate = new Date();

      const day = String(currentDate.getDate()).padStart(2, "0");
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();

      const hours = String(currentDate.getHours()).padStart(2, "0");
      const minutes = String(currentDate.getMinutes()).padStart(2, "0");

      const formattedDate = `${day} ${MONTH[month]} ${year} ${hours}:${minutes}`;
      dispatch(setLastUpdatedTime(formattedDate));

      localStorage.setItem(
        "current_flow",
        JSON.stringify({ ...flow, lastUpdated: formattedDate })
      );
    }
  }, [reactFlowInstance, dispatch]);

  return (
    <div className="absolute top-0 w-full z-[100] flex items-center justify-between p-3 px-4 bg-white border-l-2 shadow">
      <div>
        <input
          type="text"
          className="font-primary font-bold tracking-wider text-xl border-none outline-none"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <p className="font-secondary text-xs mt-2 text-gray-400">
          {lastUpdated && (
            <span className="mr-2">Last saved {lastUpdated}</span>
          )}
          <span className="bg-orange-200 text-orange-800 font-[500] py-1 px-2 rounded">
            In progress
          </span>
        </p>
      </div>
      <div className="flex items-center gap-2 font-secondary text-[1rem]">
        <button
          className="p-1 px-3 border-2 rounded-md text-gray-800 border-gray-300 hover:text-black"
          onClick={onSave}
        >
          Save as draft
        </button>
        <button className="p-1 px-3 border-2 rounded-md bg-black text-gray-100 hover:text-white">
          Publish
        </button>
      </div>
    </div>
  );
}

export default CreateRouteTopbar;
