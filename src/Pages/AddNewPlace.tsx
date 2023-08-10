import { UploadFile } from "antd";
import ImageUpload from "../Compents/ImageUpload/ImageUpload";
import Navbar from "../Compents/Navbar/Navbar";
import ReactQuillEditor from "../Compents/ReactQuill/ReactQuillEditor";

function AddNewPlace() {
  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto mt-12">
        <div className="grid gap-2">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 focus:border-gray-500 p-2 rounded shadow"
            placeholder="Enter title"
          />
        </div>
        <div className="mt-8">
          <p className="text-lg font-medium">Description</p>
          <div className="mt-2 grid border border-gray-300 shadow rounded">
            <ReactQuillEditor
              placeholder="Write something informational about this tourist spot"
              defaultValue={""}
              onValueChange={(e: string) => console.log(e)}
              theme="bubble"
              height="200px"
            />
          </div>
        </div>
        <div className="mt-8 w-full">
          <p className="tracking-wide mb-2">Images</p>
          <div className="w-full">
            <ImageUpload
              setImages={(e: UploadFile[]) =>
                // setData({ ...data, tourist_spot_images: e })
                console.log(e)
              }
              defaultValue={["data.tourist_spot_images"]}
            />
          </div>
        </div>
        <div className="flex items-center justify-end">
          <button className="p-2 px-5 rounded text-white font-medium bg-orange-500 tracking-wide text-lg mt-8">Add Place</button>
        </div>
      </div>
    </div>
  );
}

export default AddNewPlace;
