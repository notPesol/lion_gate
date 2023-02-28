import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showUi } from "./uiSlice";

const localState = JSON.parse(localStorage.getItem("user"));
console.log(localState);
const tempState = {
  token: "",
  id: "",
  username: "",
  isAdmin: false,
};

const initialState = {
  token: localState?.token || "",
  id: localState?.id || "",
  username: localState?.username || "",
  isAdmin: localState?.isAdmin || false,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue, dispatch }) => {
    try {
      const jsonBody = JSON.stringify({ username, password });
      console.log(jsonBody);
      const res = await fetch("http://localhost:8000/users/login", {
        method: "POST",
        body: jsonBody,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();
      if (!json.ok) {
        throw json?.message;
      }
      dispatch(showUi({ status: "success", message: "Login Success" }));
      return json?.payload;
    } catch (error) {
      console.log(error);
      dispatch(showUi({ status: "error", message: error }));
      return rejectWithValue(error || "Failed to login!");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user");
      state.id = "";
      state.username = "";
      state.token = "";
      state.isAdmin = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const { payload } = action;
      localStorage.setItem("user", JSON.stringify(payload));
      state.id = payload.id;
      state.username = payload.username;
      state.token = payload.token;
      state.isAdmin = payload.isAdmin;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state = { ...tempState };
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
