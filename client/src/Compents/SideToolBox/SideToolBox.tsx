import { Accordion, AccordionItem } from "@nextui-org/react";
import { VehicleType, vehicles } from "../../util";

function SideToolBox() {
  const onDragStart = (
    event: React.DragEvent<HTMLButtonElement>,
    nodeType: { name: string; image: string; type: string }
  ) => {
    let tempNodeType = {};
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
    <aside className="absolute text-black top-24 min-h-[30rem] bg-white shadow rounded-lg left-4 z-20 border border-gray-100 max-w-sm ">
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
      <div className="px-2 pb-4 max-h-96 overflow-auto grid gap-4 mt-4">
        <Accordion>
          <AccordionItem
            title={
              <p className="text-xl font-primary tracking-wide font-medium">
                Vehicle Nodes
              </p>
            }
          >
            <div className="grid grid-cols-3 gap-2  ">
              {vehicles.map((val: VehicleType, ind: number) => (
                <button
                  key={ind}
                  className="grid gap-1 place-items-center border-2 px-2 py-3 rounded-md shadow text-sm "
                  onDragStart={(event) =>
                    onDragStart(event, { ...val, type: "vehicleNode" })
                  }
                  draggable
                >
                  <img
                    src={val.image}
                    alt=""
                    className="max-w-[60px] object-center"
                  />
                  <p className="font-secondary tracking-wider text-gray-500 font-medium text-sm text-center">
                    {val.name}
                  </p>
                </button>
              ))}
            </div>
          </AccordionItem>
        </Accordion>
        <Accordion>
          <AccordionItem
            expanded
            title={
              <p className="text-xl font-primary tracking-wide font-medium">
                Other Nodes
              </p>
            }
          >
            <div className="grid grid-cols-3 gap-2">
              <button
                className="grid gap-1 place-items-center border-2 px-2 py-3 rounded-md shadow text-sm text-gray-700 font-medium tracking-wide "
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
              </button>
              <button
                className="grid gap-1 place-items-center border-2 px-2 py-3 rounded-md shadow text-sm text-gray-700 font-medium tracking-wide"
                onDragStart={(event) =>
                  onDragStart(event, {
                    type: "startNode",
                    name: "Start Node",
                    image: "",
                  })
                }
                draggable
              >
                Start <br /> Node
              </button>
              <button
                className="grid gap-1 place-items-center border-2 px-2 py-3 rounded-md shadow text-sm text-gray-700 font-medium tracking-wide"
                onDragStart={(event) =>
                  onDragStart(event, {
                    type: "endNode",
                    name: "End Node",
                    image: "",
                  })
                }
                draggable
              >
                End <br /> Node
              </button>
            </div>
          </AccordionItem>
        </Accordion>
      </div>
    </aside>
  );
}

export default SideToolBox;
