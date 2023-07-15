import { Checkbox } from "@nextui-org/react";
import { AiFillGithub } from "react-icons/ai";
import { BsGoogle } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "../Compents/Navbar/Navbar";

function Register() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className=" flex flex-grow">
        <div className=" basis-[50%] ">
          <div className="rounded-r-3xl rounded-br-3xl bg-white h-full grid place-content-center">
            <div className="min-w-[500px]">
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
                <div className="flex flex-col gap-1">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    className="border-2 p-3 shadow rounded-xl border-gray-300 focus:border-gray-700 hover:border-gray-500"
                  />
                </div>
                <div className="flex flex-col gap-1 mt-4">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="border-2 p-3 shadow rounded-xl border-gray-300 focus:border-gray-700 hover:border-gray-500"
                  />
                </div>
                <div className="flex flex-col my-4 gap-1">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="border-2 shadow p-3 rounded-xl border-gray-300 focus:border-gray-700 hover:border-gray-500"
                    name=""
                    id="password"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <Checkbox color="success">
                  <p className="tracking-wide">
                    I agree to the <span className="font-medium underline">Terms</span> and{" "}
                    <span className="font-medium underline">Privacy Policy</span>
                  </p>
                </Checkbox>
                <button className="mt-4 shadow bg-gray-700 text-white py-3 rounded-xl font-medium tracking-wider">
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
        <div className="grid place-content-center basis-[50%]">
          <img src="/reg-bg.png" alt="" className="w-full min-h-[600px]" />
        </div>
      </div>
    </div>
  );
}

export default Register;
