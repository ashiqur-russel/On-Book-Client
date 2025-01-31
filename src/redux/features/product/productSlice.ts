import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "@/types";

interface ProductState {
  filteredProducts: IProduct[];
}

const initialState: ProductState = {
  filteredProducts: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setFilteredProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.filteredProducts = action.payload;
    },
  },
});

export const { setFilteredProducts } = productSlice.actions;
export default productSlice.reducer;
