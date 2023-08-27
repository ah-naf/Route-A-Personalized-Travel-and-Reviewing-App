import { useCallback, useEffect, useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  authSetStatus,
  authSetUser,
  updateUserThunk,
} from "../../slices/AuthSlice";
import { RootState } from "../../store";
import { UserType } from "../../util";

function UserSetting() {
  const user = useSelector((state: RootState) => state.auth.user);
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [inputData, setInputData] = useState<UserType | null | undefined>(user);
  
  useEffect(() => {
    if(auth.status === 'success') {
      dispatch(authSetUser(inputData))
    }
  }, [auth.status])

  const handleSubmit = () => {
    if (!inputData) return;
    if (!inputData.name) {
      toast.error("Name field can't be empty");
      return;
    }
    dispatch(updateUserThunk(inputData) as any);
  };

  return (
    <div className="p-3 h-full relative">
      <Toaster />
      {inputData && (
        <div className="h-full border p-3 px-4 space-y-4 relative">
          <div className="grid space-y-1">
            <label htmlFor="fullName" className="font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              className="border p-2 px-3 focus:border-gray-700 border-gray-300 rounded"
              value={inputData.name}
              onChange={(e) =>
                setInputData({ ...inputData, name: e.target.value })
              }
            />
            <p className="text-xs text-gray-600">
              This is your public display name. It can be your real name or a
              pseudonym.{" "}
            </p>
          </div>
          <div className="grid space-y-1">
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              type="email"
              className="border p-2 px-3 focus:border-gray-700 border-gray-300 rounded cursor-not-allowed"
              id="email"
              disabled
              value={inputData.email}
            />
            <p className="text-xs text-gray-600">
              You can't change your email.
            </p>
          </div>
          <div className="grid space-y-1">
            <label htmlFor="bio" className="font-medium">
              Bio
            </label>
            <textarea
              className="border p-2 px-3 focus:border-gray-700 border-gray-300 rounded"
              id="bio"
              placeholder=""
              rows={3}
              value={inputData.bio}
              onChange={(e) =>
                setInputData({ ...inputData, bio: e.target.value })
              }
            ></textarea>
            <p className="text-xs text-gray-600">
              Write something about yourself or about what you like.
            </p>
          </div>
          <div className="grid space-y-1">
            <label htmlFor="url" className="font-medium">
              URL
            </label>
            <input
              type="url"
              className="border p-2 px-3 focus:border-gray-700 border-gray-300 rounded"
              id="url"
              value={inputData.url}
              onChange={(e) =>
                setInputData({ ...inputData, url: e.target.value })
              }
            />
            <p className="text-xs text-gray-600">
              Add the link to your website, blog, or social media profiles.
            </p>
          </div>
          <div className="grid space-y-1">
            <label htmlFor="tel" className="font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              className="border p-2 px-3 focus:border-gray-700 border-gray-300 rounded"
              id="tel"
              value={inputData.phone}
              onChange={(e) =>
                setInputData({ ...inputData, phone: e.target.value })
              }
            />
            <p className="text-xs text-gray-600">Your phone number</p>
          </div>
          <div className="sticky bg-white py-2 border-t bottom-0">
            <button
              className={`p-1 px-3 rounded bg-gray-800 text-white font-medium ${
                status === "loading" && "cursor-not-allowed"
              }`}
              onClick={handleSubmit}
              disabled={status === "loading"}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserSetting;
