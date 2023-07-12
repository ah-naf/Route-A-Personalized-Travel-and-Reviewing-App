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
}

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
