import { UploadFile } from "antd";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import ImageUpload from "../Compents/ImageUpload/ImageUpload";
import MultipleSelect from "../Compents/MultipleSelect/MultipleSelect";
import Navbar from "../Compents/Navbar/Navbar";
import Rating from "../Compents/Rating/Rating";
import ReactQuillEditor from "../Compents/ReactQuill/ReactQuillEditor";
import SingleDropDown from "../Compents/SingleDropDown/SingleDropDown";
import SingleImageUpload from "../Compents/SingleImageUpload/SingleImageUpload";
import { addPlaceReviewThunk } from "../slices/ReviewSlice";
import { RootState } from "../store";
import { PlaceContentType, PlaceReviewType } from "../util";

function AddNewPlace() {
  const [place, setPlace] = useState("");
  const [addNew, setAddNew] = useState(false);
  const [coverPic, setCoverPic] = useState("");
  const [rating, setRating] = useState(0);
  const [imageList, setImageList] = useState<UploadFile[]>([]);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const { place_names } = useSelector((state: RootState) => state.review);
  const [PLACE, setPLACE] = useState<string[]>([]);

  useEffect(() => {
    setPLACE(place_names.map((val) => val.value));
  }, [place_names]);

  const handleAdd = () => {
    const contents: PlaceContentType[] = imageList.map((val) => ({
      url: val.response as string,
      type: val.type as string,
    }));

    if (!title || !place || !description || !rating || !coverPic) {
      toast.error("Required field cant be empty");
      return;
    }
    const payload: PlaceReviewType = {
      title,
      place: place.toLowerCase(),
      desc: description,
      rating,
      contents,
      cover_pic: coverPic,
      tags,
    };

    dispatch(addPlaceReviewThunk(payload) as any);
  };

  return (
    <div>
      <Navbar />
      <Toaster />
      <div className="max-w-xl mx-auto mt-12">
        <div className="mb-4">
          <p className="mb-1 font-medium text-lg">Title</p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 focus:border-gray-500 rounded shadow p-2"
            placeholder="Enter Place Name"
          />
        </div>
        <div className="grid">
          <label htmlFor="title" className="mb-2 font-medium text-lg">
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
            </>
          )}
          <SingleImageUpload onValueChange={setCoverPic} />
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
        <div className="mt-4">
          <p className="font-medium text-lg">
            Add Tag <span className="font-light text-xs">(optional)</span>{" "}
          </p>
          <MultipleSelect
            onValueChange={(e: string[]) => setTags(e)}
            defaultValue={[]}
            background="orange-400"
          />
        </div>
        <div>
          <Rating onValueChange={setRating} />
        </div>
        <div className="mt-8 w-full">
          <p className="tracking-wide mb-2 text-lg font-medium">Images/Video</p>
          <div className="w-full">
            <ImageUpload
              setImages={(e: UploadFile[]) => setImageList(e)}
              defaultValue={imageList}
            />
          </div>
        </div>
        <div className="flex items-center justify-end mb-8">
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
