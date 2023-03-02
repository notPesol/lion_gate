import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiConnect } from "../../functions/fetch";
import { showUi } from "./uiSlice";

const localState = JSON.parse(localStorage.getItem("user"));
// console.log(localState);

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
    dispatch(showUi({ status: "loading", message: "Loging in..." }));
    try {
      const response = await apiConnect(
        "/users/login",
        { username, password },
        "POST"
      );
      if (!response.ok) {
        throw response?.message;
      }
      dispatch(showUi({ status: "success", message: "Login Success" }));
      return response?.payload;
    } catch (error) {
      console.log(error);
      dispatch(showUi({ status: "error", message: error }));
      return rejectWithValue(error || "Failed to login!");
    }
  }
);

// export const registerUser = createAsyncThunk(
//   "auth/register",
//   async ({ username, password }, { rejectWithValue, dispatch }) => {
//     dispatch(showUi({ status: "loading", message: "Sign up..." }));
//     try {
//       const response = await apiConnect(
//         "/users/register",
//         { username, password },
//         "POST"
//       );
//       if (!response.ok) {
//         throw response?.message;
//       }
//       dispatch(
//         showUi({
//           status: "success",
//           message: "Register Successfully, Now you can login.",
//         })
//       );
//       return response?.payload;
//     } catch (error) {
//       console.log(error);
//       dispatch(showUi({ status: "error", message: error }));
//       return rejectWithValue(error || "Failed to register!");
//     }
//   }
// );

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
