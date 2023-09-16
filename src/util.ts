import { UploadFile } from "antd";
import { clsx, type ClassValue } from "clsx";
import { Edge, Node, Viewport } from "reactflow";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface VehicleType {
  name: string;
  image: string;
}

export interface VehicleNodeData {
  label: string;
  image: string;
  cost: number;
  time: number;
  time_unit: string;
}

export interface RouteNodeData {
  place: string;
  tag: string[];
  image: string;
  desc: string;
  tourist_spot: boolean;
  tourist_spot_desc: string;
  tourist_spot_title: string;
  tourist_spot_images: UploadFile[] | null;
}

// Custom Node Slice Initial State Type
export interface CustomNodeSliceStateType {
  selectedNode:
    | {
        id: string;
        data: VehicleNodeData | RouteNodeData;
        type: string;
        editMode: boolean;
      }
    | Record<string, never>;
  lastUpdated: string;
}

export type UserType = {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: BigHeadPropsType;
  bio?: string;
  url?: string;
  phone?: string;
  createdAt: string;
};

export type FlowType = {
  edges: Edge[];
  nodes: Node[];
  viewport: Viewport;
};

export type CommentType = {
  id: string;
  text: string;
  userId: string;
  routeId: string;
  user?: UserType;
  createdAt?: string;
};

export type LikeType = {
  id: string;
  userId: string;
  routeId: string;
  user?: UserType;
  createdAt?: string;
};

export type BookmarkType = {
  id: string;
  userId: string;
  routeId: string;
  user?: UserType;
  route?: RoutePostType;
};

export interface RoutePostType {
  flow: FlowType;
  id: string;
  title: string;
  published: boolean;
  userId: string;
  user?: UserType;
  updatedAt?: string;
  createdAt?: string;
  comments?: CommentType[];
  likes?: LikeType[];
  time?: number;
  cost?: number;
  bookmarks: BookmarkType[];
}

// Auth Slice Initial State Type
export interface AuthSliceStateType {
  user: UserType | null | undefined;
  token: string | null | undefined;
  msg: string | null | undefined;
  status: "success" | "loading" | "failed" | "idle";
  loading: boolean;
}

// Route Slice Initial State Type
export interface RouteSliceStateType {
  loading: boolean;
  routes: RoutePostType[];
  activeRoute: RoutePostType | null | undefined;
  suggestions: RoutePostType[];
  comments: CommentType[];
  render: boolean;
}

export interface ProfileSliceStateType {
  profileUser: UserType | null | undefined;
  userRoutes: RoutePostType[];
  loading: boolean;
}

export interface SearchSliceStateType {
  routes: RoutePostType[];
  bookmarks: BookmarkType[];
  render: boolean
}

export const vehicles = [
  { name: "Bus", image: "/Vehicle/bus.png" },
  { name: "Car", image: "/Vehicle/car.png" },
  { name: "Rickshaw", image: "/Vehicle/rickshaw.png" },
  { name: "CNG", image: "/Vehicle/cng.png" },
  { name: "Leguna", image: "/Vehicle/leguna.png" },
  { name: "Train", image: "/Vehicle/train.png" },
  { name: "Micro-bus", image: "/Vehicle/microbus.png" },
  { name: "Plane", image: "/Vehicle/plane.png" },
];

export type BigHeadPropsType = {
  accessory?: "none" | "roundGlasses" | "tinyGlasses" | "shades";
  body?: "chest" | "breasts";
  circleColor?: "blue";
  clothing?: "naked" | "shirt" | "dressShirt" | "vneck" | "tankTop" | "dress";
  clothingColor?: "white" | "blue" | "black" | "green" | "red";
  eyebrows?: "raised" | "leftLowered" | "serious" | "angry" | "concerned";
  eyes?:
    | "normal"
    | "leftTwitch"
    | "happy"
    | "content"
    | "squint"
    | "simple"
    | "dizzy"
    | "wink"
    | "heart";
  facialHair?: "none" | "none2" | "none3" | "stubble" | "mediumBeard";
  graphic?: "none" | "redwood" | "gatsby" | "vue" | "react" | "graphQL";
  hair?:
    | "none"
    | "long"
    | "bun"
    | "short"
    | "pixie"
    | "balding"
    | "buzz"
    | "afro"
    | "bob";
  hairColor?:
    | "blonde"
    | "orange"
    | "black"
    | "white"
    | "brown"
    | "blue"
    | "pink";
  hat?: "none" | "none2" | "none3" | "none4" | "none5" | "beanie" | "turban";
  hatColor?: "white" | "blue" | "black" | "green" | "red";
  lashes?: true | false;
  lipColor?: "red" | "purple" | "pink" | "turqoise" | "green";
  mask?: boolean;
  faceMask?: boolean;
  mouth?: "grin" | "sad" | "openSmile" | "lips" | "open" | "serious" | "tongue";
  skinTone?: "light" | "yellow" | "brown" | "dark" | "red" | "black";
  faceMaskColor?: "black" | "white" | "blue" | "green" | "red";
};

export const BigHeadOptions = {
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

export type BigHeadKeyType = keyof typeof BigHeadOptions;

const MONTH = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const calculateDate = (date = "") => {
  let currentDate = new Date();
  if (date) currentDate = new Date(date);
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");

  const formattedDate = `${day} ${MONTH[month]} ${year} ${hours}:${minutes}`;
  return formattedDate;
};
