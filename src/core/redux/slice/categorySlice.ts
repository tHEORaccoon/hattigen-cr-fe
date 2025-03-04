import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Category {
  _id: string 
  name: string;
}

interface CategoriesState {
  categories: Category[];
}

const initialState: CategoriesState = {
  categories: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
    },
  },
});

export const { setCategories, addCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;