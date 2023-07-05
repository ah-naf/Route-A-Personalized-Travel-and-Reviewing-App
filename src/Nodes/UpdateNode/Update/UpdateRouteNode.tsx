import { Modal } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
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
          <div>
            <div >
              <ReactQuillEditor height="300px" />
            </div>
            
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="p-2 border-2 px-5 rounded-md text-gray-700 hover:text-black border-gray-400 hover:border-black"
            // onClick={handleSidebarClose}
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
