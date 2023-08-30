import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  claims: [],
};
const addClaimSlice = createSlice({
  name: "claims",
  initialState,
  reducers: {
    addClaims: (state, action) => {
      state.claims = action.payload;
    },
  },
});

export const { addClaims } = addClaimSlice.actions;
export default addClaimSlice;
