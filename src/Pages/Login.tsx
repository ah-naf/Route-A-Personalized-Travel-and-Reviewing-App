import { Checkbox } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../Compents/Navbar/Navbar";
import { loginUserThunk } from "../slices/AuthSlice";
import { RootState } from "../store";

function Login() {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (auth.status === "success") {
      window.location.href = "/";
    }
  }, [auth]);

  const handleSubmit = async () => {
    if (!inputData.email) {
      toast.error("Email field can't be empty");
      return;
    }
    if (!inputData.password) {
      toast.error("Password field can't be empty");
      return;
    }
    dispatch(loginUserThunk(inputData) as any);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster />
      <Navbar />
      <div className=" flex flex-grow">
        <div className="bg-orange-400 basis-[60%] ">
          <div className="rounded-r-3xl rounded-br-3xl bg-white h-full grid place-content-center">
            <div className="min-w-[500px]">
              <h1 className="text-center font-medium tracking-wide text-4xl">
                Welcome Back
              </h1>
              <p className="font-medium text-center">
                Please enter your details.
              </p>
              <div className="mt-8">
                {auth.status === "failed" && (
                  <p className="text-center bg-red-400 p-1 text-gray-50 font-medium rounded mb-1">
                    {auth.msg}
                  </p>
                )}
                <div className="flex flex-col gap-1">
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
                <Checkbox color="success">
                  <p className="font-medium">Remember for 30 days</p>
                </Checkbox>
                <button
                  className="mt-4 shadow bg-gray-700 text-white py-3 rounded-xl font-medium tracking-wider"
                  onClick={handleSubmit}
                >
                  Sign in
                </button>
                <p className="mt-6 pt-2 text-center border-t-2 font-medium tracking-wide">
                  Don't have an account?{" "}
                  <span className="hover:underline cursor-pointer">
                    <Link to={"/register"}>Sign up</Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-orange-400 grid place-content-center basis-[40%]">
          <img src="/login-bg.gif" alt="" className="w-full min-h-[600px]" />
        </div>
      </div>
    </div>
  );
}

export default Login;
