import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import addClaimSlice from "./addClaimSlice";
import categorySlice from "./categorySlice";
import locationSlice from "./locationSlice";
// import clientSlice from "./clientSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    claims: addClaimSlice.reducer,
    categories: categorySlice.reducer,
    location: locationSlice.reducer,
    // clients: clientSlice.reducer,
  },
});

export default store;
