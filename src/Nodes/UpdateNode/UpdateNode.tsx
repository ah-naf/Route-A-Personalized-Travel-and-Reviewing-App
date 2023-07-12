import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import UpdateRouteNode from "./Update/UpdateRouteNode";
import UpdateVehicleNode from "./Update/UpdateVehicleNode";
import ViewRouteNode from "../ViewNode/ViewRouteNode";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

function UpdateNode() {
  const dispatch = useDispatch();
  const selectedNode = useTypedSelector(
    (state) => state.customNode.selectedNode
  );

  return (
    <>
      {selectedNode && selectedNode.editMode ? (
        <div>
          {/* Edit Mode Enabled */}

          {selectedNode.type === "vehicleNode" && <UpdateVehicleNode />}
          {selectedNode.type === "routeNode" && <UpdateRouteNode />}
        </div>
      ) : (
        <div>
          {/* Read Only View Mode */}

          {selectedNode.type === 'routeNode' && <ViewRouteNode />}
        </div>
      )}
    </>
  );
}

export default UpdateNode;
