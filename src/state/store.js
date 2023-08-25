import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import addClaimSlice from "./addClaimSlice";
import categorySlice from "./categorySlice";
// import clientSlice from "./clientSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    claims: addClaimSlice.reducer,
    categories: categorySlice.reducer,
    // clients: clientSlice.reducer,
  },
});

export default store;
