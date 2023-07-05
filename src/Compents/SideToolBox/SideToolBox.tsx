import { Collapse } from "@nextui-org/react";
import { VehicleType, vehicles } from "../../util";

function SideToolBox() {
  const onDragStart = (event, nodeType) => {
    let tempNodeType = {}
    // if (nodeType.type === "vehicleNode") {
      tempNodeType = {
        label: nodeType.name,
        image: nodeType.image,
        type: nodeType.type,
      };
    // }
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(tempNodeType)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="absolute text-black top-24 bg-white shadow rounded-lg left-4 z-20 border border-gray-100 max-w-sm ">
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
      <div className="px-2 pb-4 max-h-96 overflow-auto">
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
                  className="w-[80px] flex flex-col border p-2 px-3 items-center justify-center rounded-md shadow z-100"
                  onDragStart={(event) =>
                    onDragStart(event, { ...val, type: "vehicleNode" })
                  }
                  draggable
                >
                  <img src={val.image} alt="" className=" object-center" />
                  <p className="font-secondary tracking-wider text-gray-500 font-medium text-sm text-center">
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
                    type: "routeNode",
                    name: "Route Node",
                    image: "",
                  })
                }
                draggable
              >
                Route <br /> Node
              </div>
            </div>
          </Collapse>
        </Collapse.Group>
      </div>
    </aside>
  );
}

export default SideToolBox;
