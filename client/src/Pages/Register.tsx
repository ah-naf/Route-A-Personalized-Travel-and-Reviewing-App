import { Checkbox } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { AiFillGithub } from "react-icons/ai";
import { BsGoogle } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../Compents/Navbar/Navbar";
import { registerUserThunk } from "../slices/AuthSlice";
import { RootState } from "../store";

function Register() {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    username: "",
    name: "",
  });
  const [termsSelected, setTermsSelected] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (auth.status === "success") {
      window.location.href = "/";
    }
  }, [auth]);

  const handleSubmit = () => {
    if (!inputData.email) {
      toast.error("Email field can't be empty");
      return;
    }
    if (!inputData.password) {
      toast.error("Password field can't be empty");
      return;
    }
    if (!inputData.username) {
      toast.error("Username field can't be empty");
      return;
    }
    if (!inputData.name) {
      toast.error("Name field can't be empty");
      return;
    }
    if (!termsSelected) {
      toast.error(
        "You have to agree the terms and condition before registering."
      );
      return;
    }
    dispatch(registerUserThunk(inputData) as any);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster />
      <Navbar />
      <div className="flex flex-grow mb-4">
        <div className="basis-full lg:basis-[50%] ">
          <div className="rounded-r-3xl rounded-br-3xl bg-white h-full grid place-content-center px-6">
            <div className="sm:min-w-[500px]">
              <h1 className="text-center font-medium tracking-wide text-4xl">
                Create Account
              </h1>
              <div className="flex items-center justify-center gap-8 mt-4">
                <span className="border-2 rounded-full p-2 border-gray-400 hover:bg-black hover:border-black hover:text-white cursor-pointer">
                  <BsGoogle />
                </span>
                <span className="border-2 rounded-full p-2 border-gray-400 hover:bg-black hover:border-black hover:text-white cursor-pointer">
                  <FaFacebookF />
                </span>
                <span className="border-2 rounded-full p-2 border-gray-400 hover:bg-black hover:border-black hover:text-white cursor-pointer">
                  <AiFillGithub />
                </span>
              </div>
              <p className="font-medium text-sm text-center mt-4">
                Or use your email for registration
              </p>
              <div className="mt-4">
                {auth.status === "failed" && auth.msg && (
                  <p className="text-center bg-red-400 p-1 text-gray-50 font-medium rounded mb-1">
                    {auth.msg}
                  </p>
                )}
                <div className="flex flex-col gap-1">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    value={inputData.name}
                    onChange={(e) =>
                      setInputData({ ...inputData, name: e.target.value })
                    }
                    placeholder="Enter your name"
                    className="border-2 p-3 shadow rounded-xl border-gray-300 focus:border-gray-700 hover:border-gray-500"
                  />
                </div>
                <div className="flex flex-col gap-1 mt-4">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    value={inputData.username}
                    onChange={(e) =>
                      setInputData({ ...inputData, username: e.target.value })
                    }
                    placeholder="Enter your username"
                    className="border-2 p-3 shadow rounded-xl border-gray-300 focus:border-gray-700 hover:border-gray-500"
                  />
                </div>
                <div className="flex flex-col gap-1 mt-4">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={inputData.email}
                    onChange={(e) =>
                      setInputData({ ...inputData, email: e.target.value })
                    }
                    placeholder="Enter your email"
                    className="border-2 p-3 shadow rounded-xl border-gray-300 focus:border-gray-700 hover:border-gray-500"
                  />
                </div>
                <div className="flex flex-col my-4 gap-1">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    value={inputData.password}
                    onChange={(e) =>
                      setInputData({ ...inputData, password: e.target.value })
                    }
                    className="border-2 shadow p-3 rounded-xl border-gray-300 focus:border-gray-700 hover:border-gray-500"
                    name=""
                    id="password"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <Checkbox
                  color="success"
                  isSelected={termsSelected}
                  onChange={(e) => setTermsSelected(e.valueOf())}
                >
                  <p className="tracking-wide">
                    I agree to the{" "}
                    <span className="font-medium underline">Terms</span> and{" "}
                    <span className="font-medium underline">
                      Privacy Policy
                    </span>
                  </p>
                </Checkbox>
                <button
                  className="mt-4 shadow bg-gray-700 text-white py-3 rounded-xl font-medium tracking-wider"
                  onClick={handleSubmit}
                >
                  Sign up
                </button>
                <p className="mt-6 pt-2 text-center border-t-2 font-medium tracking-wide">
                  Already have an account?{" "}
                  <span className="hover:underline cursor-pointer">
                    <Link to={"/login"}>Sign in</Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:grid place-content-center basis-[50%]">
          <img src="/reg-bg.png" alt="" className="w-full min-h-[600px]" />
        </div>
      </div>
    </div>
  );
}

export default Register;
