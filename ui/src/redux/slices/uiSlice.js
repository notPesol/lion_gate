import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle", // idle, loading, success, error
  message: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showUi: (state, action) => {
      const { payload } = action;
      state.status = payload?.status;
      state.message = payload.message;
    },
    hideUi: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
});

export const { showUi, hideUi } = uiSlice.actions;

export default uiSlice.reducer;
