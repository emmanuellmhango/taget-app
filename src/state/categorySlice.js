import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { GENERAL_URL } from "./url";

const initialState = {
  categories: [],
};
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categories = action.payload;
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },
  },
});

export const fetchCategories = async () => {
  const response = await axios.get(`${GENERAL_URL}/categories`);
  const { success, categories } = response.data;
  if (success) {
    return categories;
  }
};

export const { addCategory, deleteCategory } = categorySlice.actions;
export default categorySlice;
