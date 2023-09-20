import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Handle, Node, Position, useReactFlow } from "reactflow";
import { setSelectedNode } from "../../slices/CustomNodeSlice";
import { RootState } from "../../store";

interface MousePos {
  mouseX: number;
  mouseY: number;
}

function RouteNode({ id, data }) {
  const activeRoute = useSelector(
    (state: RootState) => state.route.activeRoute
  );
  let image = "/traveler.gif";
  const dataAche = Object.keys(data).length === 6;
  if (dataAche || data.place) {
    if (data.image) image = data.image;
    else image = "/waypoint.gif";
  }
  const rflow = useReactFlow();
  const dispatch = useDispatch();
  const [contextMenu, setContextMenu] = useState<MousePos | null>(null);

  const handleClick = (mode: string) => {
    if(!activeRoute) return null
    const { type } = rflow.getNode(id) as Node;

    dispatch(setSelectedNode({ id, data, type, editMode: mode === "edit" }));
    setContextMenu(null);
  };

  const handleCtxClick = (mode: string) => {
    // if(!activeRoute) return null
    const { type } = rflow.getNode(id) as Node;

    dispatch(setSelectedNode({ id, data, type, editMode: mode === "edit" }));
    setContextMenu(null);
  };

  const handleDelete = () => {
    const tempNodes = rflow.getNodes().filter((node) => node.id !== id);
    rflow.setNodes(tempNodes);
  };

  const handleContextMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    // if (activeRoute) return null;
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  return (
    <div
      onClick={() => handleClick("view")}
      onContextMenu={(e) => handleContextMenu(e)}
      className="cursor-context-menu"
    >
      <Handle
        position={Position.Bottom}
        type="source"
        className="absolute h-5 bottom-0  translate-y-[17px] w-[1px] -translate-x-1/2 after:absolute after:w-3 after:h-3 after:-bottom-1 after:bg-black after:rounded-full after:translate-x-[-4.5px]"
      />
      <Handle
        position={Position.Top}
        type="target"
        className="absolute h-5 top-0 -translate-y-[17px] w-[1px] -translate-x-1/2 after:absolute after:w-3 after:h-3 after:-top-1 after:bg-black after:rounded-full after:translate-x-[-4.5px]"
      />
      <div className="flex bg-white border-2 border-black shadow-[6px_6px_0_1px_rgba(0,0,0,0.7)]">
        {!data.routeData ? (
          <div className="w-full h-full hover:bg-[#cadee7]">
            <div className="w-32 pb-2 px-1">
              <img
                src={image}
                className={`${
                  image === "traveler.gif" ? "w-28 h-28" : "w-24 h-24"
                } object-contain mx-auto`}
                alt=""
              />
              {!dataAche && !data.place ? (
                <p className="text-xs font-primary tracking-wider font-medium text-center">
                  Double click to edit the node.
                </p>
              ) : (
                <p className="text-center font-medium font-primary tracking-wide text-lg mt-2">
                  {data.place}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      {!activeRoute && (
        <Menu
          open={contextMenu !== null}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={
            contextMenu !== null
              ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
              : undefined
          }
        >
          <MenuItem onClick={() => handleCtxClick("edit")}>
            <AiFillEdit /> <span className="ml-2">Edit</span>
          </MenuItem>
          <MenuItem onClick={() => handleCtxClick("view")}>
            <AiFillEye /> <span className="ml-2">View</span>
          </MenuItem>
          <MenuItem onClick={handleDelete} className="hover:text-red-600">
            <AiFillDelete /> <span className="ml-2">Delete</span>
          </MenuItem>
        </Menu>
      )}
    </div>
  );
}

export default RouteNode;
