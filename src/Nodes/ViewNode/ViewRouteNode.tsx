import { Modal } from "@nextui-org/react";
import { Collapse, UploadFile } from "antd";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { BiHelpCircle, BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
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
  const [modal_visible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    place: "",
    tag: [""],
    image: "",
    desc: "",
    tourist_spot: false,
  });
  const [imageList, setImageList] = useState<UploadFile[]>([]);

  useEffect(() => {
    setModalVisible(Object.keys(selectedNode).length > 0);
    const id = selectedNode.id;
    const nodeDetails = rflow.getNode(id)?.data;
    if (nodeDetails) {
      setData(nodeDetails as RouteNodeData);
      setImageList(nodeDetails.imageList);
    }
  }, [selectedNode, rflow]);

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
          <div className="mb-4 pb-2 bg-white  border-b-2 border-[rgba(0,0,0,0.2)] flex items-center gap-1">
            <h3 className="font-medium  text-2xl tracking-wide">Description</h3>
            {data.tourist_spot && (
              <span title="It is a travel spot">
                <CheckCircle className="text-white fill-blue-500 w-6 h-6" />
              </span>
            )}
            <button
              className="flex items-center"
              title="Things you should remember while visiting this place"
            >
              <BiHelpCircle size="20" />
            </button>
          </div>
          {data.desc ? (
            <>
              <p dangerouslySetInnerHTML={{ __html: data.desc }} />
              <p dangerouslySetInnerHTML={{ __html: data.desc }} />
            </>
          ) : (
            <h1 className="text-center text-2xl font-medium mt-12">
              No Description Found.
            </h1>
          )}
          <div className="mt-8">
            <Collapse
              items={[
                {
                  key: "1",
                  label: `Contents (${imageList.length})`,
                  children: <ShowContnet imageList={imageList} />,
                },
              ]}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {data.tag && data.tag.length > 0 && (
          <div className="flex gap-2 font-primary items-start w-full border-t-2 pt-4 border-[rgba(0,0,0,0.2)]">
            <h3 className="tracking-wider font-semibold text-lg w-16">
              Tags :
            </h3>
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

const ShowContnet = ({ imageList }) => {
  const [index, setIndex] = useState(0);
  if(imageList.length === 0) return <h1 className="text-lg !font-medium">No content uploaded by the user</h1>
  return (
    <div className="w-full">
      {imageList[index].type === "video/mp4" ? (
        <video
          src={imageList[index].response}
          className=" mx-auto"
          controls
          autoPlay={true}
          loop
        ></video>
      ) : (
        <img src={imageList[index].response} className="" />
      )}
      <div className="flex items-center justify-center gap-2 mt-2">
        <button
          onClick={() => {
            setIndex((index + 1) % imageList.length);
          }}
        >
          <BiLeftArrowAlt
            size="25"
            className="text-gray-600 hover:text-black"
          />
        </button>
        <button
          onClick={() => {
            setIndex(
              (index - 1 + imageList.length) % imageList.length
            );
          }}
        >
          <BiRightArrowAlt
            size="25"
            className="text-gray-600 hover:text-black"
          />
        </button>
      </div>
    </div>
  );
};
