import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import UpdateRouteNode from "./Update/UpdateRouteNode";
import UpdateVehicleNode from "./Update/UpdateVehicleNode";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

function UpdateNode() {
  const dispatch = useDispatch();
  const selectedNode = useTypedSelector(
    (state) => state.customNode.selectedNode
  );

  return (
    <div>
      {selectedNode && selectedNode.type === "vehicleNode" && (
        <UpdateVehicleNode />
      )}
      {selectedNode && selectedNode.type === "routeNode" && <UpdateRouteNode />}
    </div>
  );
}

export default UpdateNode;
