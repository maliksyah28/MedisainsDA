import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: '',
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      // action : { type: "auth/login",  payload : {id, username, name, email, password} }
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.accessToken = initialState.accessToken;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
