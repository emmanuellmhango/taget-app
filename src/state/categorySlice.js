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
  try {
    const response = await axios.get(`${GENERAL_URL}/categories`);
    const { success } = response.data;
    if (success) {
      const { categories } = response.data;
      return categories;
    }
  } catch (error) {}
};

export const { addCategory, deleteCategory } = categorySlice.actions;
export default categorySlice;
