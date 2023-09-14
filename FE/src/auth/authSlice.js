import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  fullname: "",
  username: "",
  email: "",
  role: "",
  accessToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      // action : { type: "auth/login",  payload : {id, username, name, email, password} }
      state.id = action.payload.id;
      state.fullname = action.payload.fullname;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.id = initialState.id;
      state.fullname = initialState.fullname;
      state.email = initialState.email;
      state.username = initialState.username;
      state.role = initialState.role;
      state.accessToken = initialState.accessToken;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
