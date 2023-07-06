import { Checkbox, Modal } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import MultipleSelect from "../../../Compents/MultipleSelect/MultipleSelect";
import ReactQuillEditor from "../../../Compents/ReactQuill/ReactQuillEditor";
import { setSelectedNode } from "../../../slices/CustomNodeSlice";
import { RootState } from "../../../store";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

function UpdateRouteNode() {
  const selectedNode = useTypedSelector(
    (state) => state.customNode.selectedNode
  );
  const [modal_visible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const [tags, setTags] = useState([]);
  const [isItTouristSpot, setIsItTouristSpot] = useState(false);

  useEffect(() => {
    setModalVisible(Object.keys(selectedNode).length > 0);
  }, [selectedNode]);

  const closeHandler = () => {
    dispatch(setSelectedNode({}));
  };

  return (
    <div>
      <Modal
        closeButton
        preventClose
        blur
        width="600px"
        scroll
        open={modal_visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <h1 className="text-4xl font-semibold font-primary tracking-wider">
            Update route data
          </h1>
        </Modal.Header>
        <Modal.Body>
          <div className="grid gap-4">
            <div className="flex items-center">
              <label className="font-secondary font-medium tracking-wide">
                Node ID
                <span className="mx-2"> {" -> "} </span>
              </label>
              <p className="tracking-wider ">{selectedNode.id}</p>
            </div>
            <div className="flex flex-col">
              <label htmlFor="place_name" className="tracking-wide">
                Place Name
              </label>
              <input
                type="text"
                id="place_name"
                className="border-2 p-2 rounded mt-2 outline-none border-gray-300 focus:border-gray-700"
                placeholder="Chittagong"
              />
            </div>
            <div>
              <p>
                Add Tag <span className="font-light text-xs">(optional)</span>{" "}
              </p>
              <MultipleSelect onValueChange={setTags} />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="node_image">
                Node Image{" "}
                <span className="font-light text-xs">(optional)</span>{" "}
              </label>
              <input
                type="url"
                placeholder="https://wxyz.com/img123"
                className="border-2 p-2 rounded mt-2 outline-none border-gray-300 focus:border-gray-700"
              />
              <p className="text-xs font-thin text-gray-700 tracking-wide">
                Try to add stunning image or gif for the node.
              </p>
            </div>
            <ReactQuillEditor placeholder="Describe how to get to the place or if the user has to know something about the place." />
            <Checkbox
              className="font-secondary"
              size="md"
              onChange={(e) => setIsItTouristSpot(e.valueOf())}
            >
              It is a tourist spot
            </Checkbox>
            {isItTouristSpot && (
              <div>
                <p className="tracking-wide mb-2">Tourist spot description</p>
                <ReactQuillEditor placeholder="Write something informational about this tourist spot" />
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
            // onClick={handleSave}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UpdateRouteNode;
