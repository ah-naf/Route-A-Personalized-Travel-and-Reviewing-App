import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  selectedNode:
    | {
        id: string;
        data: {
          label: string;
          image: string;
          cost: number;
          time: number;
          time_unit: string;
        };
        type: string;
      }
    | Record<string, never>;
  lastUpdated: string;
}

const initialState: initialStateType = {
  selectedNode: {},
  lastUpdated: "",
};

export const CustomNodeSlice = createSlice({
  name: "customNode",
  initialState,
  reducers: {
    setSelectedNode: (state, { payload }) => {
      state.selectedNode = payload;
    },
    setLastUpdatedTime: (state, {payload}) => {
      state.lastUpdated = payload
    }
  },
});

export const { setSelectedNode, setLastUpdatedTime } = CustomNodeSlice.actions;

export default CustomNodeSlice.reducer;
