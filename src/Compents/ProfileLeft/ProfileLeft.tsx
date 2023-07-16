import { BigHead } from "@bigheads/core";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsPersonAdd, BsTelephone } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineReportGmailerrorred } from "react-icons/md";

function ProfileLeft() {
  return (
    <div className="basis-1/3">
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white p-2 rounded-lg pt-3">
          <div className="bg-black h-36 rounded-lg relative">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 shadow-lg w-24 h-24 bg-white rounded-full pb-4 px-1 flex items-center">
              <BigHead
                accessory="shades"
                body="chest"
                circleColor="blue"
                clothing="tankTop"
                clothingColor="white"
                eyebrows="concerned"
                eyes="squint"
                faceMask={false}
                faceMaskColor="red"
                facialHair="stubble"
                graphic="gatsby"
                hair="bob"
                hairColor="orange"
                hat="none3"
                hatColor="blue"
                lashes={false}
                lipColor="purple"
                mask
                mouth="grin"
                skinTone="red"
              />
            </div>
          </div>
          <div className="text-center pt-16 px-4">
            <p className="font-primary tracking-wider font-medium text-gray-600">
              @ahnaf
            </p>
            <h3 className="font-medium tracking-wide text-2xl">
              Ahnaf Hasan Shifat
            </h3>
            <p className="font-primary tracking-wide text-gray-600">
              <span className="border-r-2 pr-2 mr-2 border-gray-300">
                Bangladesh
              </span>{" "}
              <span>Joined March 2023</span>{" "}
            </p>
            <div className="flex items-center justify-center gap-4 my-4">
              <button className="flex items-center gap-3 shadow border-2 px-2 py-1 rounded font-medium hover:border-gray-500 active:scale-[95%] transition-all">
                <span>
                  <BsPersonAdd size={25} />
                  {/* <BsPersonDown />{" "} */}
                </span>
                Follow
              </button>
              <button className="flex items-center gap-3 shadow border-2 px-2 py-1 rounded font-medium hover:border-red-500 hover:text-red-500 active:scale-[95%] transition-all">
                <span>
                  <MdOutlineReportGmailerrorred size={25} />
                </span>
                Report
              </button>
            </div>
            <p className="px-2 mt-4 font-primary text-sm tracking-wide leading-6">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut
              officia eos similique laboriosam aliquid quaerat. Eligendi labore
              delectus, earum rerum reiciendis ab est sit aperiam nesciunt dicta
              fugit eum. Nam.
            </p>
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg pb-5">
          <h1 className="text-2xl font-medium mb-3">Information</h1>
          <div className="grid gap-2">
            <p className="flex items-center text-lg text-gray-500">
              <span className="flex items-center font-primary text-xl tracking-wide gap-2">
                <CgWebsite />
                Website
              </span>
              <span className="ml-auto text-black text-sm  font-medium">
                www.ahnaf.com
              </span>
            </p>
            <p className="flex items-center text-lg text-gray-500">
              <span className="flex items-center font-primary text-xl  gap-2">
                <HiOutlineMail />
                E-mail
              </span>
              <span className="ml-auto text-black tracking-wide text-sm  font-medium">
                ahnaf@test.com
              </span>
            </p>
            <p className="flex items-center text-lg text-gray-500">
              <span className="flex items-center font-primary text-xl gap-2">
                <BsTelephone />
                Phone
              </span>
              <span className="ml-auto text-black  tracking-wide text-sm  font-medium">
                +8801639236879
              </span>
            </p>
            <p className="flex items-center text-lg text-gray-500">
              <span className="flex items-center font-primary text-xl gap-2">
                <AiOutlineCalendar />
                Joined
              </span>
              <span className="ml-auto text-black tracking-wide text-sm font-medium">
                12 March, 2023
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileLeft;
