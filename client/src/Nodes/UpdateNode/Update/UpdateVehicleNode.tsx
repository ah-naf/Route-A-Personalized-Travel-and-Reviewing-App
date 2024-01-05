import { Input, Modal } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useReactFlow } from "reactflow";
import { setSelectedNode } from "../../../slices/CustomNodeSlice";
import { RootState } from "../../../store";
import { VehicleNodeData, vehicles } from "../../../util";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

function UpdateVehicleNode() {
  const rflow = useReactFlow();
  const selectedNode = useTypedSelector(
    (state) => state.customNode.selectedNode
  );

  const [vehicleIcon, setVehicleIcon] = useState("");
  const [nodeDetails, setNodeDetails] = useState({
    vehicle_type: "",
    cost: 0,
    time_taken: 0,
    vehicle_icon: "",
    time_unit: "minutes",
  });

  const [modal_visible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setModalVisible(Object.keys(selectedNode).length > 0);
  }, [selectedNode]);

  const closeHandler = () => {
    dispatch(setSelectedNode({}));
  };

  useEffect(() => {
    vehicles.forEach((val) => {
      if (val.name.toLowerCase() === nodeDetails.vehicle_type.toLowerCase()) {
        setVehicleIcon(val.image);
      }
    });
  }, [nodeDetails.vehicle_icon, nodeDetails.vehicle_type]);

  useEffect(() => {
    if (selectedNode && selectedNode.data) {
      const dd = selectedNode.data as VehicleNodeData;
      setNodeDetails((prev) => ({
        ...prev,
        vehicle_type: dd.label,
        cost: dd.cost,
        time_taken: dd.time,
        time_unit: dd.time_unit || "minutes",
      }));
      setVehicleIcon(selectedNode.data.image);
    }
  }, [selectedNode]);

  const handleSave = () => {
    const tempNode = rflow.getNodes().map((node) => {
      if (node.id === selectedNode.id) {
        return {
          ...node,
          data: {
            label: nodeDetails.vehicle_type,
            cost: nodeDetails.cost,
            time: nodeDetails.time_taken,
            image: nodeDetails.vehicle_icon || vehicleIcon,
            time_unit: nodeDetails.time_unit,
          },
        };
      }
      return node;
    });
    rflow.setNodes(tempNode);
    dispatch(setSelectedNode({}));
  };

  return (
    <div>
      <Modal
        closeButton
        blur
        scroll
        width="500px"
        preventClose
        open={modal_visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <h1 className="text-3xl font-semibold font-primary tracking-wider">
            Update vehicle node
          </h1>
        </Modal.Header>
        <Modal.Body>
          <div className="w-full scrollbar-thin px-2 scrollbar-thumb-gray-200  flex flex-col gap-3 flex-grow overflow-auto">
            <div className="flex items-center">
              <label className="font-secondary font-medium tracking-wide">
                Node ID
                <span className="mx-2"> {" -> "} </span>
              </label>
              <p className="tracking-wider ">{selectedNode.id}</p>
            </div>
            <div>
              <label className="font-secondary font-medium tracking-wide">
                Vehicle Type
              </label>
              <Input
                placeholder="Bus"
                fullWidth
                className="mt-1"
                value={nodeDetails.vehicle_type}
                onChange={(e) => {
                  setNodeDetails({
                    ...nodeDetails,
                    vehicle_type: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <label className="font-secondary font-medium tracking-wide">
                Cost
              </label>
              <Input
                type="number"
                helperText="Currency: Taka"
                helperColor="primary"
                className="mt-1"
                placeholder="20"
                fullWidth
                value={nodeDetails.cost}
                onChange={(e) =>
                  setNodeDetails({
                    ...nodeDetails,
                    cost: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div className="mt-3">
              <label className="font-secondary font-medium tracking-wide">
                Time Taken
              </label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  className="mt-1"
                  placeholder="20"
                  fullWidth
                  value={nodeDetails.time_taken}
                  onChange={(e) =>
                    setNodeDetails({
                      ...nodeDetails,
                      time_taken: parseInt(e.target.value),
                    })
                  }
                />
                <select
                  name="time_unit"
                  id=""
                  value={nodeDetails.time_unit}
                  onChange={(e) =>
                    setNodeDetails({
                      ...nodeDetails,
                      time_unit: e.target.value,
                    })
                  }
                  className="px-2 rounded-lg text-xs h-10 bg-transparent border-2 border-gray-400"
                >
                  <option value="minutes">Minutes</option>
                  <option value="hours">Hours</option>
                  <option value="days">Days</option>
                </select>
              </div>
            </div>
            <div>
              <label className="font-secondary font-medium tracking-wide">
                Vehicle Icon
              </label>
              <Input
                className="mt-1"
                placeholder="https://wxyz.com/pic/123"
                type="url"
                fullWidth
                helperColor="primary"
                helperText="(Optional) If this field is empty default icon will be used."
                value={nodeDetails.vehicle_icon}
                onChange={(e) =>
                  setNodeDetails({
                    ...nodeDetails,
                    vehicle_icon: e.target.value,
                  })
                }
              />
            </div>
            {vehicleIcon && (
              <div className="flex items-center gap-3 font-bold mt-6">
                <p className="text-lg tracking-wider font-medium">Icon</p>
                <span>{"--->"}</span>

                <img
                  className="w-24 border-2 p-3 rounded-lg object-contain object-center"
                  src={vehicleIcon}
                  alt=""
                />
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="p-2 border-2 px-5 rounded-md text-gray-700 hover:text-black border-gray-400 hover:border-black"
            onClick={closeHandler}
          >
            Close
          </button>
          <button
            className="p-2 border-2 px-5 rounded-md bg-black text-gray-300 hover:text-white"
            onClick={handleSave}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UpdateVehicleNode;
