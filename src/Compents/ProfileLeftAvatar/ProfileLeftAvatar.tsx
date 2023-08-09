import { BigHead } from "@bigheads/core";
import { useState } from "react";
import { BigHeadPropsType } from "../../util";

function ProfileLeftAvatar() {
  const [BigHeadProps, setBigHeadProps] = useState<BigHeadPropsType>({
    accessory: "shades",
    body: "chest",
    circleColor: "blue",
    clothing: "tankTop",
    clothingColor: "white",
    eyebrows: "concerned",
    eyes: "squint",
    faceMask: false,
    facialHair: "stubble",
    graphic: "gatsby",
    hair: "bob",
    hairColor: "orange",
    hat: "none3",
    hatColor: "blue",
    lashes: false,
    lipColor: "purple",
    mask: true, // Assuming this is a boolean property
    mouth: "grin",
    skinTone: "red",
  });

  return (
    <>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 shadow-lg w-24 h-24 bg-white rounded-full pb-4 px-1 flex items-center">
        <BigHead {...BigHeadProps} />
      </div>
    </>
  );
}

export default ProfileLeftAvatar;
