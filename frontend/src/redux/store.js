import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import jobSlice from "./slices/jobSlice";
import { jobsApi } from "./api/jobsApi";

const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
    [jobsApi.reducerPath]: jobsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobsApi.middleware),
});

export default store;
