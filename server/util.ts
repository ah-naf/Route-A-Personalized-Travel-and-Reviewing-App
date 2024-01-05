import { BigHeadOptions } from "./type";

const BigHeadOptions = {
  accessory: ["none", "roundGlasses", "tinyGlasses", "shades"],
  body: ["chest", "breasts"],
  circleColor: ["blue"],
  clothing: ["naked", "shirt", "dressShirt", "vneck", "tankTop", "dress"],
  clothingColor: ["white", "blue", "black", "green", "red"],
  eyebrows: ["raised", "leftLowered", "serious", "angry", "concerned"],
  eyes: [
    "normal",
    "leftTwitch",
    "happy",
    "content",
    "squint",
    "simple",
    "dizzy",
    "wink",
    "heart",
  ],
  facialHair: ["none", "none2", "none3", "stubble", "mediumBeard"],
  graphic: ["none", "redwood", "gatsby", "vue", "react", "graphQL"],
  hair: [
    "none",
    "long",
    "bun",
    "short",
    "pixie",
    "balding",
    "buzz",
    "afro",
    "bob",
  ],
  hairColor: ["blonde", "orange", "black", "white", "brown", "blue", "pink"],
  hat: ["none", "none2", "none3", "none4", "none5", "beanie", "turban"],
  hatColor: ["white", "blue", "black", "green", "red"],
  lashes: [true, false],
  lipColor: ["red", "purple", "pink", "turqoise", "green"],
  mask: [true, false],
  faceMask: [true, false],
  mouth: ["grin", "sad", "openSmile", "lips", "open", "serious", "tongue"],
  skinTone: ["light", "yellow", "brown", "dark", "red", "black"],
  faceMaskColor: ["black", "white", "blue", "green", "red"],
};

function getRandomValue<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

type RandomBigHead = {
  [K in keyof BigHeadOptions]: BigHeadOptions[K][number];
};

export function generateRandomBigHead(): RandomBigHead {
  const randomBigHead: RandomBigHead = {
    accessory: getRandomValue(BigHeadOptions.accessory),
    body: getRandomValue(BigHeadOptions.body),
    circleColor: getRandomValue(BigHeadOptions.circleColor),
    clothing: getRandomValue(BigHeadOptions.clothing),
    clothingColor: getRandomValue(BigHeadOptions.clothingColor),
    eyebrows: getRandomValue(BigHeadOptions.eyebrows),
    eyes: getRandomValue(BigHeadOptions.eyes),
    facialHair: getRandomValue(BigHeadOptions.facialHair),
    graphic: getRandomValue(BigHeadOptions.graphic),
    hair: getRandomValue(BigHeadOptions.hair),
    hairColor: getRandomValue(BigHeadOptions.hairColor),
    hat: getRandomValue(BigHeadOptions.hat),
    hatColor: getRandomValue(BigHeadOptions.hatColor),
    lashes: getRandomValue(BigHeadOptions.lashes),
    lipColor: getRandomValue(BigHeadOptions.lipColor),
    mask: getRandomValue(BigHeadOptions.mask),
    faceMask: getRandomValue(BigHeadOptions.faceMask),
    mouth: getRandomValue(BigHeadOptions.mouth),
    skinTone: getRandomValue(BigHeadOptions.skinTone),
    faceMaskColor: getRandomValue(BigHeadOptions.faceMaskColor),
  };

  return randomBigHead;
}
