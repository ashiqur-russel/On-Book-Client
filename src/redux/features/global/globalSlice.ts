import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IInitialState {
  isCartOpen: boolean;
  isDarkMode: boolean;
}

const initialState: IInitialState = {
  isCartOpen: false,
  isDarkMode: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },

    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { toggleCart, setIsDarkMode } = globalSlice.actions;

export const selectToggleCartStatus = (state: RootState) =>
  state.global.isCartOpen;

export const selectCurrentGlobalMode = (state: RootState) =>
  state.global.isDarkMode;

export default globalSlice.reducer;
