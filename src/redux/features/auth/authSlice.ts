import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type TAuthState = {
  user: TUser | null;
  token: null | string;
};

export type TUser = {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    },

    logOut: (state) => {
      state.user = null;
      state.token = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
