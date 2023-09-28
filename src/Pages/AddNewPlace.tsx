import { UploadFile } from "antd";
import { useState } from "react";
import ImageUpload from "../Compents/ImageUpload/ImageUpload";
import Navbar from "../Compents/Navbar/Navbar";
import Rating from "../Compents/Rating/Rating";
import ReactQuillEditor from "../Compents/ReactQuill/ReactQuillEditor";
import SingleDropDown from "../Compents/SingleDropDown/SingleDropDown";
import SingleImageUpload from "../Compents/SingleImageUpload/SingleImageUpload";

const PLACE = ["Chittagong", "Dhaka", "Comilla"];

function AddNewPlace() {
  const [place, setPlace] = useState("");
  const [addNew, setAddNew] = useState(false);
  const [coverPic, setCoverPic] = useState("");
  const [rating, setRating] = useState(0);
  const [imageList, setImageList] = useState<UploadFile[]>([]);
  const [description, setDescription] = useState("");

  const handleAdd = () => {
    console.log({ place, coverPic, rating, imageList, description });
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto mt-12">
        <div className="grid">
          <label htmlFor="title" className="mb-2">
            Place Name
          </label>
          {!addNew ? (
            <>
              <SingleDropDown
                columnNames={PLACE}
                initValue={place}
                onValueChange={setPlace}
              />
              <p
                className="text-xs text-right hover:underline text-gray-600 hover:text-gray-800 cursor-pointer"
                onClick={() => {
                  setAddNew(true);
                  setPlace("");
                }}
              >
                Click to add new place
              </p>
            </>
          ) : (
            <>
              <input
                type="text"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                className="w-full border border-gray-300 focus:border-gray-500 rounded shadow p-2"
                placeholder="Enter Place Name"
              />
              <p
                className="text-xs text-right hover:underline text-gray-600 hover:text-gray-800 cursor-pointer"
                onClick={() => {
                  setAddNew(false);
                  setPlace("");
                }}
              >
                Place already exist
              </p>
              <SingleImageUpload onValueChange={setCoverPic} />
            </>
          )}
        </div>
        <div className="mt-8">
          <p className="text-lg font-medium">Description</p>
          <div className="mt-2 grid border border-gray-300 shadow rounded">
            <ReactQuillEditor
              placeholder="Write something informational about this tourist spot"
              defaultValue={description}
              onValueChange={(e: string) => setDescription(e)}
              theme="bubble"
              height="200px"
            />
          </div>
        </div>
        <div>
          <Rating onValueChange={setRating} />
        </div>
        <div className="mt-8 w-full">
          <p className="tracking-wide mb-2 font-medium">Images/Video</p>
          <div className="w-full">
            <ImageUpload
              setImages={(e: UploadFile[]) => setImageList(e)}
              defaultValue={imageList}
            />
          </div>
        </div>
        <div className="flex items-center justify-end">
          <button
            className="p-2 px-5 rounded text-white font-medium bg-orange-500 tracking-wide text-lg mt-8"
            onClick={handleAdd}
          >
            Add Place
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddNewPlace;
