import { Modal } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { BiHelpCircle } from "react-icons/bi";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useReactFlow } from "reactflow";
import { setSelectedNode } from "../../slices/CustomNodeSlice";
import { RootState } from "../../store";
import { RouteNodeData } from "../../util";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

function ViewRouteNode() {
  const rflow = useReactFlow();
  const selectedNode = useTypedSelector(
    (state) => state.customNode.selectedNode
  );
  console.log(selectedNode);
  const [modal_visible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    place: "",
    tag: [""],
    image: "",
    desc: "",
    tourist_spot: false,
    tourist_spot_desc: "",
  });

  useEffect(() => {
    setModalVisible(Object.keys(selectedNode).length > 0);
    if (selectedNode.data) {
      setData(selectedNode.data as RouteNodeData);
    }
  }, [selectedNode]);

  const closeHandler = () => {
    dispatch(setSelectedNode({}));
  };

  return (
    <Modal
      closeButton
      blur
      width="700px"
      scroll
      open={modal_visible}
      onClose={closeHandler}
    >
      <Modal.Body>
        <div className="pb-4">
          <div className="mb-4 pb-2 border-b-2 border-[rgba(0,0,0,0.2)] flex items-center gap-1">
            <h3 className="font-medium text-2xl tracking-wide">Description</h3>
            {data.tourist_spot && (
              <p className="text-sm tracking-wide text-gray-600 font-medium">
                (Tourist Place)
              </p>
            )}
            <button
              className="flex items-center"
              title="Things you should remember while visiting this place"
            >
              <BiHelpCircle />
            </button>
          </div>
          {data.desc ? <p dangerouslySetInnerHTML={{ __html: data.desc }} /> : <h1 className="text-center text-2xl font-medium mt-12">No Description Found.</h1>}
        </div>
      </Modal.Body>
      <Modal.Footer>
        {data.tag && data.tag.length > 0 && (
          <div className="flex gap-2 font-primary items-start w-full border-t-2 pt-4 border-[rgba(0,0,0,0.2)]">
            <h3 className="tracking-wider font-semibold text-lg w-16">Tags :</h3>
            <div className="grid grid-cols-8 gap-2">
              {data.tag.map((val, ind) => (
                <button
                  className="bg-black text-white px-2 py-1 rounded text-sm font-primary tracking-wider font-medium"
                  key={ind}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default ViewRouteNode;
