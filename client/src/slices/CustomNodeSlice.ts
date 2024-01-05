import { createSlice } from "@reduxjs/toolkit";
import { CustomNodeSliceStateType } from "../util";

const initialState: CustomNodeSliceStateType = {
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
    setLastUpdatedTime: (state, { payload }) => {
      state.lastUpdated = payload;
    },
  },
});

export const { setSelectedNode, setLastUpdatedTime } = CustomNodeSlice.actions;

export default CustomNodeSlice.reducer;
